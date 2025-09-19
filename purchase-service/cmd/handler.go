package main

import (
	"github.com/h6ok/response"
	"net/http"
	"time"
)

type PurchaseRequest struct {
	UserId      string `json:"userId"`
	TotalAmount int    `json:"totalAmount"`
	Email       string `json:"email"`
}

type PurchaseEvent struct {
	Type        string    `json:"type"`
	Username    string    `json:"username,omitempty"`
	Email       string    `json:"email,omitempty"`
	TotalAmount int       `json:"totalAmount,omitempty"`
	IP          string    `json:"ip"`
	Timestamp   time.Time `json:"timestamp"`
}

func Purchase(server *PurchaseServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method == "OPTION" {
			response.Success(w).Return()
			return
		}

		var payload PurchaseRequest
		err := ReadJson(r, &payload)
		if err != nil {
			response.BadRequest(w).Json().SetError(err).Return()
			return
		}

		event := PurchaseEvent{
			Type:        "purchase",
			Username:    payload.UserId,
			Email:       payload.Email,
			TotalAmount: payload.TotalAmount,
			IP:          r.RemoteAddr,
			Timestamp:   time.Now(),
		}
		go server.Producer.PublishPurchaseEvent(event)

		data := struct {
			Status string `json:"status"`
		}{
			Status: "success",
		}

		response.Success(w).Json().SetBody(data).Return()
	}
}
