package kafka

import (
	"fmt"
)

type Message struct {
	From     string
	To       string
	Subject  string
	HtmlBody string
	TextBody string
}

func (msg *Message) BuildMessage() string {
	boundary := ""

	// ヘッダー部分
	headers := fmt.Sprintf("From: %s\r\n", msg.From)
	headers += fmt.Sprintf("To: %s\r\n", msg.To)
	headers += fmt.Sprintf("Subject: %s\r\n", msg.Subject)
	headers += "MIME-Version: 1.0\r\n"
	headers += fmt.Sprintf("Content-Type: multipart/alternative; boundary=\"%s\"\r\n", boundary)
	headers += "\r\n"

	// テキスト部分
	textPart := fmt.Sprintf("--%s\r\n", boundary)
	textPart += "Content-Type: text/plain; charset=utf-8\r\n"
	textPart += "Content-Transfer-Encoding: 8bit\r\n"
	textPart += "\r\n"
	textPart += msg.TextBody + "\r\n"
	textPart += "\r\n"

	// HTML部分
	htmlPart := fmt.Sprintf("--%s\r\n", boundary)
	htmlPart += "Content-Type: text/html; charset=utf-8\r\n"
	htmlPart += "Content-Transfer-Encoding: 8bit\r\n"
	htmlPart += "\r\n"
	htmlPart += msg.HtmlBody + "\r\n"
	htmlPart += "\r\n"

	// 終了境界
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
	// get html template

	// get plain text template

	return ""
}

func GetSignUpMessage(event Event) string {
	// get html template

	// get plain text template

	return ""
}
