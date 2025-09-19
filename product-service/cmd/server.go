package main

import (
	"database/sql"
	"net/http"

	_ "github.com/lib/pq"
	"product-service/config"
)

type ProductServer struct {
	DB      *sql.DB
	Handler http.Handler
}

func NewServer(config *config.Config) (*ProductServer, error) {

	db, err := ConnectDB(config.Driver, config.DSN)
	if err != nil {
		return &ProductServer{}, err
	}

	server := ProductServer{
		DB: db,
	}

	router := http.NewServeMux()
	server.SetHandler(router)
	server.Handler = SetMiddleware(router)

	return &server, nil
}

func (server *ProductServer) Start() error {
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

func (server *ProductServer) SetHandler(mux *http.ServeMux) {
	mux.HandleFunc("/products", GetProduct(server))
}
