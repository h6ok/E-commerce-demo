package kafka

type NotificationHandler struct {
	From    string
	Address string
}

func NewNotificationHandler() *NotificationHandler {
	return &NotificationHandler{
		From:    "nowhere",
		Address: "here",
	}
}

func (handler *NotificationHandler) Push(event Event) error {
	return nil
}

