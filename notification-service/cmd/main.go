package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"notification-service/cache"
	"notification-service/kafka"
	"time"

	"github.com/IBM/sarama"
	"github.com/gorilla/websocket"
)

func main() {
	go consumeKafka()

	http.HandleFunc("/ws", handleWebsocket)
	http.ListenAndServe(":8082", nil)
}

func consumeKafka() {
	config := sarama.NewConfig()
	config.Consumer.Group.Rebalance.Strategy = sarama.NewBalanceStrategyRoundRobin()

	var consumerGroup sarama.ConsumerGroup
	var err error
	duration := 2
	for {
		consumerGroup, err = sarama.NewConsumerGroup([]string{"kafka:29092"}, "notification-service", config)
		if err != nil {
			log.Println("kafka is not ready...")
			time.Sleep(time.Duration(duration) * time.Second)
			duration = duration * 2
			continue
		} else {
			log.Println("successfully connected to kafka")
			break
		}
	}

	handler := kafka.NewConsumer()
	for {
		log.Println("consuming...")
		if err := consumerGroup.Consume(context.Background(), []string{"purchase-events"}, handler); err != nil {
			log.Println(err)
		}
	}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ConnectionData struct {
	UserId string `json:"userId"`
}

func handleWebsocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		return
	}

	defer conn.Close()

	for {
		messageType, msg, err := conn.ReadMessage()
		if err != nil {
			continue
		}

		var jsonData ConnectionData
		err = json.Unmarshal(msg, &jsonData)
		if err == nil {
			fmt.Println("cache add")
			cache.Add(jsonData.UserId, conn)
		}
		conn.WriteMessage(messageType, msg)
	}
}

