package kafka

import (
	"encoding/json"

	"github.com/IBM/sarama"
)

type KafkaProducer struct {
	Producer sarama.SyncProducer
}

const broker = "kafka:29092"

func NewKafkaProducer() (*KafkaProducer, error) {

	config := sarama.NewConfig()
	config.Producer.Return.Successes = true
	config.Producer.RequiredAcks = sarama.WaitForAll

	brokers := []string{broker}
	producer, err := sarama.NewSyncProducer(brokers, config)
	return &KafkaProducer{Producer: producer}, err
}

func (kp *KafkaProducer) PublishAuthEvent(data any) error {
	json, err := json.Marshal(data)
	if err != nil {
		return err
	}

	msg := &sarama.ProducerMessage{
		Topic: "auth-events",
		Value: sarama.StringEncoder(json),
	}

	_, _, err = kp.Producer.SendMessage(msg)
	return err
}
