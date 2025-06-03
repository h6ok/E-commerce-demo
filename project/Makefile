build_auth:
	@echo "building authApp..."
	cd ../authentication-service & GOOS=linux CGO_ENABLE=0 go build -e authApp ./cmd/
	@echo "Done!"

up_build:build_auth
	@echo "building images..."
	docker compose down
	docker compose up