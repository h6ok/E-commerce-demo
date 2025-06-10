package main

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/h6ok/response"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/authenticate", Authenticate())
	mux.HandleFunc("/sign-up", SignUp())
	mux.HandleFunc("/ping", Ping())
	// mux.HandleFunc("/handle", Handler())

	err := http.ListenAndServe(":8081", mux)
	if err != nil {
		log.Panic(err)
	}
}

func Authenticate() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		Post(w, r, "http://auth-service:8080/authenticate")
	}
}

func SignUp() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		Post(w, r, "http://auth-service:8080/sign-up")
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

func Post(w http.ResponseWriter, r *http.Request, url string) {
	client := &http.Client{}

	rBody, err := io.ReadAll(r.Body)
	if err != nil {
		response.BadRequest(w).SetError(err).Return()
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(rBody))
	if err != nil {
		response.BadRequest(w).SetError(err).Return()
		return
	}

	res, err := client.Do(req)
	if err != nil {
		response.BadRequest(w).SetError(err).Return()
		return
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		response.BadRequest(w).SetError(err).Return()
		return
	}

	var obj interface{}
	err = json.Unmarshal(data, &obj)
	if err != nil {
		response.BadRequest(w).SetError(err).Return()
		return
	}

	response.Success(w).
		Json().
		SetBody(obj).
		Return()
}
