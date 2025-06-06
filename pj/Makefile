build_gateway:
	@echo "building api-gateway..."
	cd ../api-gateway && GOOS=linux CGO_ENABLE=0 go build -o api-gateway ./cmd

build_auth:
	@echo "building authApp..."
	cd ../authentication-service && GOOS=linux CGO_ENABLE=0 go build -o authApp ./cmd

build_log:
	@echo "building logApp..."
	cd ../log-service && GOOS=linux CGO_ENABLE=0 go build -o logApp ./cmd	

up_build:build_gateway build_auth build_log
	@echo "building images..."
	docker compose down
	docker compose up -d

down:
	@echo "down all containers..."
	docker compose down -v
	@echo "remove images..."
	docker rmi pj-api-gateway:latest
	docker rmi pj-auth-service:latest
	docker rmi pj-log-service:latest