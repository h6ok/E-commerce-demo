package main

import (
	"log"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const DURATION time.Duration = time.Duration(time.Hour * 24)

func CreateToken() (string, error) {
	claims := jwt.MapClaims{
		"user_id": "user_id",
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	accessToken, err := token.SignedString([]byte("aaaaaa"))
	if err != nil {
		log.Println("token cannot published")
		return "", err
	}

	return accessToken, nil
}

func ValidToken(token string) error {
	// TODO
	return nil
}
