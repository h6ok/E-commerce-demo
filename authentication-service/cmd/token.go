package main

import (
	"time"

	"github.com/golang-jwt/jwt"
)

const DURATION time.Duration = time.Duration(time.Hour * 24)

func CreateToken() (string, error) {
	claims := jwt.MapClaims{
		"user_id": "user_id",
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodES256, claims)
	accessToken, err := token.SignedString([]byte("aaaaaa"))
	if err != nil {
		return "", err
	}

	return accessToken, nil
}

func ValidToken(token string) error {
	// TODO
	return nil
}
