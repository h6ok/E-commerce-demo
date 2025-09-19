package handler

import (
	"api-gateway/conn"
	"fmt"
	"github.com/h6ok/response"
	"net/http"
)

func Purchase() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		resp, err := conn.Post[any](w, r, "http://purchase-service:8080/purchase")
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
