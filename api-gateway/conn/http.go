package conn

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"time"
)

type Response[T any] struct {
	Status    int          `json:"status"`
	Data      T            `json:"data"`
	Error     ErroResponse `json:"error"`
	Timestamp time.Time    `json:"timestamp"`
}

type ErroResponse struct {
	Message string `json:"message"`
}

func Post[T any](w http.ResponseWriter, r *http.Request, url string) (Response[T], error) {
	client := &http.Client{}

	rBody, err := io.ReadAll(r.Body)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot read body from request")
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(rBody))
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot make request for service")
	}

	res, err := client.Do(req)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot connect to service")
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannnot read response from service")
	}

	var obj Response[T]
	err = json.Unmarshal(data, &obj)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot format response from service to json")
	}

	return obj, nil
}

func Get[T any](w http.ResponseWriter, r *http.Request, host string) (Response[T], error) {
	params := r.URL.Query()

	targetURL := &url.URL{
		Scheme: "http",
		Host:   host,
		Path:   r.URL.Path,
	}
	targetURL.RawQuery = params.Encode()

	fmt.Println(targetURL.String())

	client := &http.Client{}
	req, err := http.NewRequest("GET", targetURL.String(), nil)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot make request for service")
	}

	res, err := client.Do(req)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot connect to service")
	}

	data, err := io.ReadAll(res.Body)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot read response from service")
	}

	var obj Response[T]
	err = json.Unmarshal(data, &obj)
	if err != nil {
		return Response[T]{}, fmt.Errorf("cannot format response fro service to json")
	}

	return obj, nil
}
