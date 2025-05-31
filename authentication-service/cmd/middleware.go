package main

import "net/http"

func SetMiddleware(*http.ServeMux) *http.ServeMux {
	return SetHandler()
}

func SetHandler(...http.HandlerFunc) *http.ServeMux {
	return &http.ServeMux{}
}
