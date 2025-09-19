package main

import (
	"database/sql"
	"fmt"
	"github.com/h6ok/response"
	"net/http"
)

type Product struct {
	Id       string `json:"id"`
	Name     string `json:"name"`
	Price    int    `json:"price"`
	Category string `json:"category"`
}

const COST int = 10

const SEARCH_PRODUCT string = `
	SELECT id, name, price, category FROM "product"
	`

const SEARCH_CATEGORY_PRODUCT string = `
	SELECT id, name, price, category FROM "product" WHERE category = $1
`

func GetProduct(server *ProductServer) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		if server.DB == nil {
			fmt.Println("query cannot execute")
			return
		}

		category := r.URL.Query().Get("category")
		fmt.Println(category)
		var rows *sql.Rows
		var err error
		if category != "" {
			rows, err = server.DB.Query(SEARCH_CATEGORY_PRODUCT, category)
		} else {
			rows, err = server.DB.Query(SEARCH_PRODUCT)
		}
		if err != nil {
			fmt.Println(err.Error())
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		// defer rows.Close()

		var products []Product
		for rows.Next() {
			var product Product
			err := rows.Scan(
				&product.Id,
				&product.Name,
				&product.Price,
				&product.Category,
			)

			if err != nil {
				fmt.Println(err.Error())
				response.ServerError(w).Json().SetError(err).Return()
				return
			}

			products = append(products, product)
		}

		if err = rows.Err(); err != nil {
			fmt.Println(err.Error())
			response.ServerError(w).Json().SetError(err).Return()
			return
		}

		response.Success(w).Json().SetBody(products).Return()
	}
}
