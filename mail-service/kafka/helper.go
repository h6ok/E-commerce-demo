package kafka

const AuthMessage = `認証しました。`
const SignUpMessage = `サインアップ完了`

func GetMessage(eventType string) string {
	switch eventType {
	case "auth":
		return AuthMessage
	case "sign-up":
		return SignUpMessage
	}
	return ""
}
