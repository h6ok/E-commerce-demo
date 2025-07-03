package kafka

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"log"
	"text/template"
	"time"
)

const (
	authTemplateHtml   = "/app/auth.html"
	authTemplateText   = "/app/auth.txt"
	signUpTemplateHtml = "/app/sign-up.html"
	signUpTemplateText = "/app/sign-up.txt"
)

type Message struct {
	From     string
	To       string
	Subject  string
	HtmlBody string
	TextBody string
}

func (msg *Message) BuildMessage() string {
	boundary := "boundary"

	headers := fmt.Sprintf("From: %s\r\n", msg.From)
	headers += fmt.Sprintf("To: %s\r\n", msg.To)
	headers += fmt.Sprintf("Subject: %s\r\n", msg.Subject)
	headers += "MIME-Version: 1.0\r\n"
	headers += fmt.Sprintf("Content-Type: multipart/alternative; boundary=\"%s\"\r\n", boundary)
	headers += "\r\n"

	textPart := fmt.Sprintf("--%s\r\n", boundary)
	textPart += "Content-Type: text/plain; charset=utf-8\r\n"
	textPart += "Content-Transfer-Encoding: base64\r\n"
	textPart += "\r\n"
	textPart += base64.StdEncoding.EncodeToString([]byte(msg.TextBody)) + "\r\n"
	textPart += "\r\n"

	htmlPart := fmt.Sprintf("--%s\r\n", boundary)
	htmlPart += "Content-Type: text/html; charset=utf-8\r\n"
	htmlPart += "Content-Transfer-Encoding: base64\r\n"
	htmlPart += "\r\n"
	htmlPart += base64.StdEncoding.EncodeToString([]byte(msg.HtmlBody)) + "\r\n"
	htmlPart += "\r\n"

	endBoundary := fmt.Sprintf("--%s--\r\n", boundary)

	return headers + textPart + htmlPart + endBoundary
}

func GetMessage(event Event) string {
	switch event.Of() {
	case "auth":
		return GetAuthMessage(event)
	case "sign-up":
		return GetSignUpMessage(event)
	}
	return ""
}

func GetAuthMessage(event Event) string {
	data := map[string]string{
		"Username":    event.GetUsername(),
		"LoginTime":   time.Now().String(),
		"Location":    "Nowhere",
		"Device":      "Your Device",
		"SecurityURL": "https://example.com",
	}

	// prep html template
	var hb bytes.Buffer
	ht := template.Must(template.ParseFiles(authTemplateHtml))
	err := ht.Execute(&hb, data)
	if err != nil {
		log.Panic()
	}

	// prep text template
	var tb bytes.Buffer
	tt := template.Must(template.ParseFiles(authTemplateText))
	err = tt.Execute(&tb, data)
	if err != nil {
		log.Panic()
	}

	msg := &Message{
		From:     "E-Commerce-Demo Application",
		To:       event.GetEmail(),
		Subject:  "Auth Notification Service",
		HtmlBody: hb.String(),
		TextBody: tb.String(),
	}

	return msg.BuildMessage()
}

func GetSignUpMessage(event Event) string {
	data := map[string]string{
		"Username":        event.GetUsername(),
		"VerificationURL": "https://example.com",
	}

	// prep html template
	var hb bytes.Buffer
	ht := template.Must(template.ParseFiles(signUpTemplateHtml))
	err := ht.Execute(&hb, data)
	if err != nil {
		log.Panic()
	}

	// prep text template
	var tb bytes.Buffer
	tt := template.Must(template.ParseFiles(signUpTemplateText))
	err = tt.Execute(&tb, data)
	if err != nil {
		log.Panic()
	}

	msg := &Message{
		From:     "E-Commerce-Demo Application",
		To:       event.GetEmail(),
		Subject:  "Sign-Up Notification Service",
		HtmlBody: hb.String(),
		TextBody: tb.String(),
	}

	return msg.BuildMessage()
}
