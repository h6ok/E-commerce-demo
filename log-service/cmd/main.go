package main

import (
	"context"
	"log"
	"log-service/kafka"
	"time"

	"github.com/IBM/sarama"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const mongoURI string = "mongodb://root:password@mongo-log:27017"

func main() {

	var client *mongo.Client
	var err error
	for {
		client, err = connectMongo()
		if err != nil {
			log.Println("mongo is not ready...")
			time.Sleep(3 * time.Second)
			continue
		} else {
			log.Println("successfully connected to mongo")
			break
		}
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()

	config := sarama.NewConfig()
	config.Consumer.Group.Rebalance.Strategy = sarama.NewBalanceStrategyRoundRobin()

	var consumerGroup sarama.ConsumerGroup
	duration := 2
	for {
		consumerGroup, err = sarama.NewConsumerGroup([]string{"kafka:29092"}, "log-service", config)
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

	handler := kafka.NewConsumer(client)
	for {
		log.Println("consuming...")
		if err := consumerGroup.Consume(context.Background(), []string{"auth-events"}, handler); err != nil {
			log.Println(err)
		}
	}
}

func connectMongo() (*mongo.Client, error) {
	opt := options.Client().ApplyURI(mongoURI)
	client, err := mongo.Connect(context.TODO(), opt)
	return client, err
}
