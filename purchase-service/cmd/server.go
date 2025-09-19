package main

import (
	"database/sql"
	"log"
	"net/http"
	"time"

	"purchase-service/config"
	"purchase-service/kafka"

	_ "github.com/lib/pq"
)

type PurchaseServer struct {
	Handler  http.Handler
	Producer *kafka.KafkaProducer
}

func NewServer(config *config.Config) (*PurchaseServer, error) {

	server := PurchaseServer{}

	for {
		producer, err := kafka.NewKafkaProducer()
		if err != nil {
			log.Println("kafka is not ready...")
			time.Sleep(2 * time.Second)
			continue
		} else {
			server.Producer = producer
			log.Println("successfully connected to kafka")
			break
		}
	}

	router := http.NewServeMux()
	server.SetHandler(router)
	server.Handler = SetMiddleware(router)

	return &server, nil
}

func (server *PurchaseServer) Start() error {
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

func (server *PurchaseServer) SetHandler(mux *http.ServeMux) {
	mux.HandleFunc("/purchase", Purchase(server))
}
