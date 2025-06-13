package main

import (
	"context"
	"log"
	"mail-service/kafka"
	"time"

	"github.com/IBM/sarama"
)

func main() {

	config := sarama.NewConfig()
	config.Consumer.Group.Rebalance.Strategy = sarama.NewBalanceStrategyRoundRobin()

	var consumerGroup sarama.ConsumerGroup
	var err error
	duration := 2
	for {
		consumerGroup, err = sarama.NewConsumerGroup([]string{"kafka:29092"}, "mail-service", config)
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
		if err := consumerGroup.Consume(context.Background(), []string{"auth-events", "sign-up-events", "purchase-events"}, handler); err != nil {
			log.Println(err)
		}
	}
}
