package main

import (
	"context"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const mongoURI string = "mongodb://root:password@mongo-log:27017"

func main() {
	// connect to mongo
	client, err := connectMongo()
	if err != nil {
		log.Panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()

	// consume event from kafka
	// register log to
	err = http.ListenAndServe(":8082", nil)
	if err != nil {
		log.Panic(err)
	}
}

func connectMongo() (*mongo.Client, error) {
	opt := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), opt)
	return client, err
}
