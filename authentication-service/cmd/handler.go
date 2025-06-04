package main

import (
	"context"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type user struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type loginRequest struct {
	Id       string `json:"id"`
	Password string `json:"password"`
}

const COST int = 10

const SIGN_UP string = `
	INSERT into "user" (username, email, password)
	VALUES ($1, $2, $3); 
	`

const LOG_IN string = `
	SELECT username, email, password FROM "user" WHERE email = $1 LIMIT 1
	`

func Authenticate(server *AuthServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload loginRequest
		err := ReadJson(r, &payload)
		if err != nil {
			ErrorJson(w, err)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
		defer cancel()

		row := server.DB.QueryRowContext(ctx, LOG_IN, payload.Id)
		var user user
		err = row.Scan(
			&user.Username,
			&user.Email,
			&user.Password,
		)
		if err != nil {
			ErrorJson(w, err)
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
		if err != nil {
			ErrorJson(w, err)
			return
		}

		token, err := CreateToken()
		if err != nil {
			ErrorJson(w, err)
			return
		}

		data := struct {
			Token string `json:"token"`
		}{
			Token: token,
		}
		WriteJson(w, data, http.StatusAccepted)
	}
}

func SignUp(server *AuthServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload user
		err := ReadJson(r, &payload)
		if err != nil {
			ErrorJson(w, err)
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
		defer cancel()

		encrypted, err := bcrypt.GenerateFromPassword([]byte(payload.Password), COST)
		if err != nil {
			ErrorJson(w, err)
			return
		}

		_, err = server.DB.ExecContext(
			ctx,
			SIGN_UP,
			payload.Username,
			payload.Email,
			encrypted)

		if err != nil {
			ErrorJson(w, err)
			return
		}

		message := struct {
			Message string `json:"message"`
		}{
			Message: "sign-up successfully done!",
		}
		WriteJson(w, message, http.StatusAccepted)
	}
}
