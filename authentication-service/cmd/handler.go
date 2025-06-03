package main

import (
	"context"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"
)

type user struct {
	Username string
	Email    string
	Password string
}

type loginRequest struct {
	id       string
	password string
}

const COST int = 10

const SIGN_UP string = `
	INSERT user (username, email, password)
	VALUES (?, ?, ?); 
	`

const LOG_IN string = `
	SELECT username, email, password FROM user WHERE email = ? LIMIT 1
	`

func Authenticate(server *AuthServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload loginRequest
		err := ReadJson(r, payload)
		if err != nil {
			ErrorJson(w, err)
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
		defer cancel()

		row := server.DB.QueryRowContext(ctx, LOG_IN, payload.id)
		var user user
		err = row.Scan(
			&user.Username,
			&user.Email,
			&user.Password,
		)
		if err != nil {
			ErrorJson(w, err)
		}

		err = bcrypt.CompareHashAndPassword([]byte(payload.password), []byte(user.Password))
		if err != nil {
			ErrorJson(w, err)
		}

		token, err := CreateToken()
		if err != nil {
			ErrorJson(w, err)
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
		err := ReadJson(r, payload)
		if err != nil {
			ErrorJson(w, err)
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
		defer cancel()

		encrypted, err := bcrypt.GenerateFromPassword([]byte(payload.Password), COST)
		if err != nil {
			ErrorJson(w, err)
		}

		_, err = server.DB.ExecContext(
			ctx,
			SIGN_UP,
			payload.Username,
			payload.Email,
			encrypted)

		if err != nil {
			ErrorJson(w, err)
		}

		message := struct {
			Message string `json:"message"`
		}{
			Message: "sign-up successfully done!",
		}
		WriteJson(w, message, http.StatusAccepted)
	}
}
