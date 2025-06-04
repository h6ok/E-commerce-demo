package main

import (
	"database/sql"
	"net/http"

	"authentication/config"

	_ "github.com/lib/pq"
)

type AuthServer struct {
	DB      *sql.DB
	Handler http.Handler
}

func NewServer(config *config.Config) (*AuthServer, error) {

	db, err := ConnectDB(config.Driver, config.DSN)
	if err != nil {
		return &AuthServer{}, err
	}

	server := AuthServer{
		DB: db,
	}

	router := http.NewServeMux()
	server.SetAuthHandler(router)
	server.Handler = SetMiddleware(router)

	return &server, nil
}

func (server *AuthServer) Start() error {
	err := http.ListenAndServe(":8080", server.Handler)
	if err != nil {
		return err
	}
	return nil
}

func ConnectDB(driver string, dsn string) (*sql.DB, error) {
	db, err := sql.Open(driver, dsn)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func SetMiddleware(router *http.ServeMux) http.Handler {
	return CreateMiddleware(
		EnableCORS,
		AuthMiddleware,
	)(router)
}

func (server *AuthServer) SetAuthHandler(mux *http.ServeMux) {
	mux.HandleFunc("/authenticate", Authenticate(server))
	mux.HandleFunc("/sign-up", SignUp(server))
}
