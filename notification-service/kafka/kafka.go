package kafka

import (
	"encoding/json"
	"log"
	"time"

	"github.com/IBM/sarama"
)

type ConsumerGroupHandler struct {
	Handler *NotificationHandler
}

type Event interface {
	GetUsername() string
	Of() string
	GetType() string
}

type PurchaseEvent struct {
	Type        string    `json:"type"`
	Username    string    `json:"username,omitempty"`
	TotalAmount string    `json:"totalAmount"`
	IP          string    `json:"ip"`
	Timestamp   time.Time `json:"timestamp"`
}

func (purchaseEvent *PurchaseEvent) Of() string {
	return "auth"
}

func (purchaseEvent *PurchaseEvent) GetType() string {
	return purchaseEvent.Type
}

func (purchaseEvent *PurchaseEvent) GetUsername() string {
	return purchaseEvent.Username
}

func NewConsumer() *ConsumerGroupHandler {
	handler := NewNotificationHandler()
	return &ConsumerGroupHandler{
		Handler: handler,
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

		switch msg.Topic {
		case "purchase-events":
			var purchaseEvent PurchaseEvent
			err := json.Unmarshal(msg.Value, &purchaseEvent)
			if err != nil {
				log.Println("cannot unmarshal")
			}

			err = handler.Handler.Push(&purchaseEvent)
			if err != nil {
				log.Println(err)
			}

		default:
			log.Printf("caught unknown event. topic is [%s]", msg.Topic)
		}
	}
	return nil
}
