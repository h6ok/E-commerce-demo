package main

import (
	"api-gateway/handler"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/authenticate", handler.Authenticate())
	mux.HandleFunc("/sign-up", handler.SignUp())
	mux.HandleFunc("/ping", handler.Ping())
	mux.HandleFunc("/log-out", handler.LogOut())

	router := CreateMiddleware(
		EnableCORS,
	)(mux)

	err := http.ListenAndServe(":8081", router)
	if err != nil {
		log.Panic(err)
	}
}
