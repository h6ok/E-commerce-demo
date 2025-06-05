package main

import (
	"net/http"

	"github.com/hiroaki-th/response"
)

func main() {

}

func Handle(w http.ResponseWriter, r *http.Request) {
	response.Accepted(w).Return()
}
