package handler

import (
	"api-gateway/cache"
	"api-gateway/conn"
	"fmt"
	"github.com/h6ok/response"
	"net/http"
)

type UserData struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Info     string `json:"info"`
}

func Authenticate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTION" {
			response.Success(w).
				Return()
			return
		}

		cookie, err := r.Cookie("e-commerce-demo")
		if err == nil && cookie.Value != "" {
			if info, ok := cache.Get(cookie.Value); ok {
				data := UserData{
					Username: info.Username,
					Email:    info.Email,
					Info:     "cache used",
				}
				response.Success(w).
					Json().
					SetBody(data).
					Return()
				return
			}
		}

		resp, err := conn.Post[cache.UserCache](w, r, "http://auth-service:8080/authenticate")
		if err != nil {
			response.BadRequest(w).
				Json().
				SetError(err).
				Return()
			return
		}

		cache.Add(resp.Data.Username, resp.Data)

		http.SetCookie(w, &http.Cookie{
			Name:     "e-commerce-demo",
			Value:    resp.Data.Username,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
		})

		response.Status(w, resp.Status).
			Json().
			SetBody(resp.Data).
			SetError(fmt.Errorf(resp.Error.Message)).
			Return()
	}
}

func SignUp() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTION" {
			r := response.Success(w)
			r.Return()
			return
		}

		resp, err := conn.Post[cache.UserCache](w, r, "http://auth-service:8080/sign-up")
		if err != nil {
			response.BadRequest(w).
				Json().
				SetError(err).
				Return()
			return
		}

		cache.Add(resp.Data.Username, resp.Data)

		http.SetCookie(w, &http.Cookie{
			Name:     "e-commerce-demo",
			Value:    resp.Data.Username,
			Path:     "/",
			HttpOnly: true,
			Secure:   false,
		})

		data := UserData{
			Username: resp.Data.Username,
			Email:    resp.Data.Email,
		}

		response.Status(w, resp.Status).
			Json().
			SetBody(data).
			SetError(fmt.Errorf(resp.Error.Message)).
			Return()

	}
}

func Ping() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		response.Accepted(w).
			Json().
			SetBody(
				struct {
					Message string `json:"message"`
				}{
					Message: "connection resolved",
				}).
			Return()
	}
}

func LogOut() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		cookie, err := r.Cookie("e-commerce-demo")
		if err == nil && cookie.Value != "" {
			if _, ok := cache.Get(cookie.Value); ok {
				cache.Delete(cookie.Value)
				response.Success(w).
					Return()
				return
			}
		}

	}
}
