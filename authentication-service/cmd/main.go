package main

import (
	"authentication/config"
	"log"
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
