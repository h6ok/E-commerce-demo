package kafka

import (
	"github.com/IBM/sarama"
	"go.mongodb.org/mongo-driver/mongo"
)

type ConsumerGroupHandler struct {
	Client *mongo.Client
}

func NewConsumer(client *mongo.Client) *ConsumerGroupHandler {
	return &ConsumerGroupHandler{
		Client: client,
	}
}

func (handler *ConsumerGroupHandler) SetUp(session sarama.ConsumerGroupSession) error {
	return nil
}

func (handler *ConsumerGroupHandler) CleanUp(session sarama.ConsumerGroupSession) error {
	return nil
}

func (handler *ConsumerGroupHandler) ConsumerClaim(
	session sarama.ConsumerGroupSession, claim sarama.ConsuerGroupClaim) error {

	for msg := range claim.Message() {
		session.MarkMessage(msg, "")
	}
	return nil
}
