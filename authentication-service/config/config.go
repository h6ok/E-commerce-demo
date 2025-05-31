package config

type Config struct {
	Port   string
	Driver string
	DSN    string
}

func GetConfig() *Config {
	return &Config{}
}
