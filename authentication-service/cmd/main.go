package main

import (
	"authentication/config"
	"log"
)

func main() {

	config := config.GetConfig()

	server, err := NewServer(config)
	if err != nil {
		log.Panic(err)
	}

	server.Start()

}
