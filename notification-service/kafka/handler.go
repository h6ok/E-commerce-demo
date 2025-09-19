package kafka

import (
	"encoding/json"
	"fmt"
	"notification-service/cache"

	"github.com/gorilla/websocket"
)

type NotificationHandler struct {
	From    string
	Address string
}

func NewNotificationHandler() *NotificationHandler {
	return &NotificationHandler{
		From:    "nowhere",
		Address: "here",
	}
}

func (handler *NotificationHandler) Push(event Event) error {
	conn := cache.Get(event.GetUsername())

	data := struct {
		Status string `json:"status"`
	}{
		Status: "success",
	}

	byte, err := json.Marshal(data)
	if err != nil {
		fmt.Println("error has occurred")
	}

	err = conn.WriteMessage(websocket.TextMessage, byte)
	if err != nil {
		fmt.Println("cannot push to client")
	}

	return nil
}
