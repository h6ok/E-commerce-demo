package main

import (
	"encoding/json"
	"io"
	"net/http"
)

func ReadJson(r *http.Request, obj any) error {

	data, err := io.ReadAll(r.Body)
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &obj)
	if err != nil {
		return err
	}

	return nil
}

func WriteJson(w http.ResponseWriter, payload any, status int) error {

	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	w.WriteHeader(status)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
	return nil
}

func ErrorJson(w http.ResponseWriter, err error) error {
	payload := struct {
		Message string `json:"message"`
	}{
		Message: err.Error(),
	}

	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	w.WriteHeader(http.StatusBadRequest)
	w.Header().Set("Content-Type", "application/json")
	w.Write(data)
	return nil
}
