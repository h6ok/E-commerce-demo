package cache

type UserCache struct {
	Username string
	Email    string
	Token    string
}

var SessionPool = make(map[string]UserCache)

func Add(sessionId string, info UserCache) {
	SessionPool[sessionId] = info
}

func Get(sessionId string) (UserCache, bool) {
	info, ok := SessionPool[sessionId]
	return info, ok
}
