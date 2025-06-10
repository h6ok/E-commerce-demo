package kafka

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/IBM/sarama"
	"go.mongodb.org/mongo-driver/mongo"
)

type ConsumerGroupHandler struct {
	Client *mongo.Client
}

type AuthEvent struct {
	Type      string    `json:"type"`
	Username  string    `json:"username,omitempty"`
	IP        string    `json:"ip"`
	Timestamp time.Time `json:"timestamp"`
}

func NewConsumer(client *mongo.Client) *ConsumerGroupHandler {
	return &ConsumerGroupHandler{
		Client: client,
	}
}

func (handler *ConsumerGroupHandler) Setup(session sarama.ConsumerGroupSession) error {
	return nil
}

func (handler *ConsumerGroupHandler) Cleanup(session sarama.ConsumerGroupSession) error {
	return nil
}

func (handler *ConsumerGroupHandler) ConsumeClaim(
	session sarama.ConsumerGroupSession, claim sarama.ConsumerGroupClaim) error {

	for msg := range claim.Messages() {
		var authEvent AuthEvent
		err := json.Unmarshal(msg.Value, &authEvent)
		if err != nil {
			log.Println("cannot unmarshal event payload")
			continue
		}

		coll := handler.Client.Database("logs").Collection("auth")
		result, err := coll.InsertOne(context.TODO(), authEvent)

		if err != nil {
			log.Println(err)
			continue
		} else {
			fmt.Printf("new log: insertID[%s]\n", result.InsertedID)
		}

		session.MarkMessage(msg, "")
	}
	return nil
}
