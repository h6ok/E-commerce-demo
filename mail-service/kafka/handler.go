package kafka

import (
	"bytes"
	"crypto/tls"
	"log"
	"net/smtp"
)

type MailHandler struct {
	From    string
	Address string
	Auth    smtp.Auth
}

const (
	from     = "taharahiroaki10@gmail.com"
	password = "nesucyhazwerlwpp"
	host     = "smtp.gmail.com"
	address  = "smtp.gmail.com:587"
)

func NewMailHandler() *MailHandler {

	auth := smtp.PlainAuth("", from, password, host)

	return &MailHandler{
		From:    from,
		Address: address,
		Auth:    auth,
	}
}

func (handler *MailHandler) Send(event Event) error {

	// connect to smtp server
	c, err := smtp.Dial("smtp.gmail.com:587")
	if err != nil {
		return err
	}
	defer c.Quit()

	// set up to communicate with tls
	tlsConfig := &tls.Config{
		ServerName: host,
	}
	err = c.StartTLS(tlsConfig)
	if err != nil {
		return err
	}

	// send auth info
	if err = c.Auth(handler.Auth); err != nil {
		return err
	}

	// set up from
	if err = c.Mail(handler.From); err != nil {
		return err
	}

	// set up to
	if err = c.Rcpt(event.GetEmail()); err != nil {
		return err
	}

	// get message
	msg := GetMessage(event)

	// write message to buffer
	wc, err := c.Data()
	if err != nil {
		return err
	}

	var buff bytes.Buffer
	_, err = buff.WriteString(msg)
	if err != nil {
		return err
	}

	if _, err = buff.WriteTo(wc); err != nil {
		return err
	}

	wc.Close()
	log.Printf("mail has successfully send to %s", event.GetEmail())
	return nil
}
