package config

import (
	"encoding/json"
	"os"
)

type Config struct {
	Port   string `json:"port"`
	Driver string `json:"driver"`
	DSN    string `json:"dsn"`
}

func LoadConfig() (Config, error) {
	file, err := os.Open("./config/config.json")
	if err != nil {
		return Config{}, err
	}
	defer file.Close()

	var cfg Config
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&cfg)
	if err != nil {
		return Config{}, err
	}

	return cfg, nil
}
