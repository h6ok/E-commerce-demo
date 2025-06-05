package config

import (
	"encoding/json"
	"io"
	"os"
)

type Config struct {
	Port        string `json:"port"`
	AuthService string `json:"auth-service"`
}

func LoadConfig() (*Config, error) {
	file, err := os.Open("./config/config.json")
	if err != nil {
		return &Config{}, err
	}
	defer file.Close()

	data, err := io.ReadAll(file)
	if err != nil {
		return &Config{}, err
	}

	var config Config
	err = json.Unmarshal(data, &config)
	return &config, err
}
