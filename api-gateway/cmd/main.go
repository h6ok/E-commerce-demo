package main

import (
	"api-gateway/cache"
	"bytes"
	"encoding/json"
	"fmt"
	"github.com/h6ok/response"
	"io"
	"log"
	"net/http"
	"time"
)

type Response[T any] struct {
	Status    int          `json:"status"`
	Data      T            `json:"data"`
	Error     ErroResponse `json:"error"`
	Timestamp time.Time    `json:"timestamp"`
}

type ErroResponse struct {
	Message string `json:"message"`
}

type UserData struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Info     string `json:"info"`
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/authenticate", Authenticate())
	mux.HandleFunc("/sign-up", SignUp())
	mux.HandleFunc("/ping", Ping())
	// mux.HandleFunc("/handle", Handler())

	router := CreateMiddleware(
		EnableCORS,
	)(mux)

	err := http.ListenAndServe(":8081", router)
	if err != nil {
		log.Panic(err)
	}
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

		resp, err := Post[cache.UserCache](w, r, "http://auth-service:8080/authenticate")
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

		resp, err := Post[cache.UserCache](w, r, "http://auth-service:8080/sign-up")
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

func Post[T any](w http.ResponseWriter, r *http.Request, url string) (Response[T], error) {
	client := &http.Client{}

	rBody, err := io.ReadAll(r.Body)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot read body from request")
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(rBody))
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot make request for service")
	}

	res, err := client.Do(req)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot connect to service")
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannnot read response from service")
	}

	var obj Response[T]
	err = json.Unmarshal(data, &obj)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot format response from service to json")
	}

	return obj, nil
}
