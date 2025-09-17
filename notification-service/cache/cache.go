package cache

import (
	"github.com/gorilla/websocket"
)

var ConnectionPool = make(map[string]*websocket.Conn)

func Add(username string, conn *websocket.Conn) {
	ConnectionPool[username] = conn
}

func Get(username string) *websocket.Conn {
	return ConnectionPool[username]
}
