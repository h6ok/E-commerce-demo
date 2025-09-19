package handler

import (
	"api-gateway/conn"
	"fmt"
	"github.com/h6ok/response"
	"net/http"
)

type ProductData struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Category string `json:"category"`
}

func GetProducts() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		resp, err := conn.Get[[]ProductData](w, r, "product-service:8080")
		if err != nil {
			response.BadRequest(w).Json().SetError(err).Return()
			return
		}

		response.Status(w, resp.Status).
			Json().
			SetBody(resp.Data).
			SetError(fmt.Errorf(resp.Error.Message)).
			Return()
	}
}
