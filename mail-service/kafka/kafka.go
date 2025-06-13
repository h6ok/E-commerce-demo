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

func (signUpEvent *SignUpEvent) GetUsername() string {
	return signUpEvent.Username
}

func (signUpEvent *SignUpEvent) GetEmail() string {
	return signUpEvent.Email
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
		var authEvent AuthEvent
		err := json.Unmarshal(msg.Value, &authEvent)

		var signUpEvent SignUpEvent
		if err != nil {
			err = json.Unmarshal(msg.Value, &signUpEvent)
		}

		if err != nil {
			log.Println("cannot unmarshal")
			continue
		}

	switchState:
		switch {
		case authEvent.Type != "":
			handler.Handler.Send(&authEvent)
			break switchState
		case signUpEvent.Type != "":
			handler.Handler.Send(&signUpEvent)
			break switchState
		}

		session.MarkMessage(msg, "")
	}
	return nil
}
