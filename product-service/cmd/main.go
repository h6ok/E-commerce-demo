package main

import (
	"log"
	"product-service/config"
)

func main() {

	cfg, err := config.LoadConfig()
	if err != nil {
		log.Panic(err)
	}

	server, err := NewServer(&cfg)
	if err != nil {
		log.Panic(err)
	}

	err = server.Start()
	if err != nil {
		log.Panic(err)
	}
}
