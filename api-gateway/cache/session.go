package cache

type UserCache struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Token    string `json:"token"`
}

var SessionPool = make(map[string]UserCache)

func Add(sessionId string, info UserCache) {
	SessionPool[sessionId] = info
}

func Get(sessionId string) (UserCache, bool) {
	info, ok := SessionPool[sessionId]
	return info, ok
}

func Delete(sessionId string) {
	delete(SessionPool, sessionId)
}
