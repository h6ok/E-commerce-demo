package main

import (
	"authentication/cache"
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/h6ok/response"
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

type AuthEvent struct {
	Type      string    `json:"type"`
	Username  string    `json:"username,omitempty"`
	Email     string    `json:"email,omitempty"`
	IP        string    `json:"ip"`
	Timestamp time.Time `json:"timestamp"`
}

type SignUpEvent struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Email    string `json:"email"`
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

		cookie, _ := r.Cookie("e-commerce-demo")
		if info, ok := cache.Get(cookie.Value); ok {
			data := struct {
				Username string `json:"username"`
				Email    string `json:"email"`
			}{
				Username: info.Username,
				Email:    info.Email,
			}
			response.Success(w).Json().SetBody(data).Return()
		}

		if r.Method == "OPTION" {
			response.Success(w).Return()
			return
		}

		var payload loginRequest
		err := ReadJson(r, &payload)
		if err != nil {
			response.BadRequest(w).Json().SetError(err).Return()
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
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
		if err != nil {
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		token, err := CreateToken()
		if err != nil {
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		sessionId := fmt.Sprintf(user.Username, time.Now().String())
		cache.Add(sessionId, cache.UserCache{
			Username: user.Username,
			Email:    user.Email,
			Token:    token,
		})

		data := struct {
			Username string `json:"username"`
			Email    string `json:"email"`
		}{
			Username: user.Username,
			Email:    user.Email,
		}

		event := AuthEvent{
			Type:      "authenticate",
			Username:  user.Username,
			Email:     user.Email,
			IP:        r.RemoteAddr,
			Timestamp: time.Now(),
		}
		go server.Producer.PublishAuthEvent(event)

		http.SetCookie(w, &http.Cookie{
			Name:     "e-commerce-demo",
			Value:    sessionId,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
		})
		response.Success(w).Json().SetBody(data).Return()
	}
}

func SignUp(server *AuthServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var payload user
		err := ReadJson(r, &payload)
		if err != nil {
			response.BadRequest(w).Json().SetError(err).Return()
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), time.Duration(time.Second*10))
		defer cancel()

		encrypted, err := bcrypt.GenerateFromPassword([]byte(payload.Password), COST)
		if err != nil {
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		_, err = server.DB.ExecContext(
			ctx,
			SIGN_UP,
			payload.Username,
			payload.Email,
			encrypted)

		if err != nil {
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		token, err := CreateToken()
		if err != nil {
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		sessionId := fmt.Sprintf(payload.Username, time.Now().String())
		cache.Add(sessionId, cache.UserCache{
			Username: payload.Username,
			Email:    payload.Email,
			Token:    token,
		})
		message := struct {
			Username string `json:"username"`
			Email    string `json:"email"`
		}{
			Username: payload.Username,
			Email:    payload.Email,
		}

		event := SignUpEvent{
			Type:     "sign-up",
			Username: payload.Username,
			Email:    payload.Email,
		}
		go server.Producer.PublishSignUpEvent(event)

		http.SetCookie(w, &http.Cookie{
			Name:     "e-commerce-demo",
			Value:    sessionId,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
		})
		response.Success(w).Json().SetBody(message).Return()
	}
}
