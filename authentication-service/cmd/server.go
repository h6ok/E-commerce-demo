package main

import (
	"database/sql"
	"net/http"

	"authentication/config"
)

type AuthServer struct {
	DB     *sql.DB
	Router *http.ServeMux
}

func NewServer(config *config.Config) (*AuthServer, error) {

	db, err := ConnectDB(config.Driver, config.DSN)
	if err != nil {
		return &AuthServer{}, err
	}

	router := Router()

	return &AuthServer{
		DB:     db,
		Router: router,
	}, nil
}

func (server *AuthServer) Start() error {
	err := http.ListenAndServe(":8080", nil)
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
