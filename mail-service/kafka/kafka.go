package kafka

import (
	"encoding/json"
	"log"
	"time"

	"github.com/IBM/sarama"
)

type ConsumerGroupHandler struct {
	Handler *MailHandler
}

type Event interface {
	GetEmail() string
	GetUsername() string
	Of() string
	GetType() string
}

type AuthEvent struct {
	Type      string    `json:"type"`
	Username  string    `json:"username,omitempty"`
	Email     string    `json:"email"`
	IP        string    `json:"ip"`
	Timestamp time.Time `json:"timestamp"`
}

func (authEvent *AuthEvent) Of() string {
	return "auth"
}

func (authEvent *AuthEvent) GetType() string {
	return authEvent.Type
}

func (authEvent *AuthEvent) GetUsername() string {
	return authEvent.Username
}

func (authEvent *AuthEvent) GetEmail() string {
	return authEvent.Email
}

type SignUpEvent struct {
	Type     string `json:"type"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func (signUpEvent *SignUpEvent) Of() string {
	return "sign-up"
}

func (signUpEvent *SignUpEvent) GetType() string {
	return signUpEvent.Type
}

func (signUpEvent *SignUpEvent) GetUsername() string {
	return signUpEvent.Username
}

func (signUpEvent *SignUpEvent) GetEmail() string {
	return signUpEvent.Email
}

type PurchaseEvent struct {
	Type        string `json:"type"`
	Username    string `json:"username,omitempty"`
	Email       string `json:"email,omitempty"`
	TotalAmount int    `json:"totalAmount,omitempty"`
}

func (event *PurchaseEvent) Of() string {
	return "purchase"
}

func (event *PurchaseEvent) GetType() string {
	return event.Type
}

func (event *PurchaseEvent) GetUsername() string {
	return event.Username
}

func (event *PurchaseEvent) GetEmail() string {
	return event.Email
}

func NewConsumer() *ConsumerGroupHandler {
	handler := NewMailHandler()
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
		case "auth-events":
			var authEvent AuthEvent
			err := json.Unmarshal(msg.Value, &authEvent)
			if err != nil {
				log.Println("cannot unmarshal")
			}

			err = handler.Handler.Send(&authEvent)
			if err != nil {
				log.Println(err)
			}

		case "sign-up-events":
			var signUpEvent SignUpEvent
			err := json.Unmarshal(msg.Value, &signUpEvent)
			if err != nil {
				log.Println("cannot unmarshal")
				return err
			}

			err = handler.Handler.Send(&signUpEvent)
			if err != nil {
				log.Println(err)
			}

		case "purchase-events":
			var purchaseEvent PurchaseEvent
			err := json.Unmarshal(msg.Value, &purchaseEvent)
			if err != nil {
				log.Println("cannot marshal")
			}

			err = handler.Handler.Send(&purchaseEvent)
			if err != nil {
				log.Println(err)
			}
		default:
			log.Printf("caught unknown event. topic is [%s]", msg.Topic)
		}
	}
	return nil
}
