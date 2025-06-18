package kafka

import "net/smtp"

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

func (handler *MailHandler) Send(data Event) error {
	err := smtp.SendMail(
		handler.Address,
		handler.Auth,
		handler.From,
		[]string{data.GetEmail()},
		[]byte(GetMessage(data)))

	if err != nil {
		return err
	}
	return nil
}
