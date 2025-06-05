build_gateway:
	@echo "building api-gateway..."
	cd ../api-gateway && GOOS=linux CGO_ENABLE=0 go build -o api-gateway ./cmd

build_auth:
	@echo "building authApp..."
	cd ../authentication-service && GOOS=linux CGO_ENABLE=0 go build -o authApp ./cmd

db_volumes:
	mkdir db-data/auth-data

up_build:build_gateway build_auth db_volumes
	@echo "building images..."
	docker compose down
	docker compose up -d

down:
	@echo "down all containers..."
	docker compose down -v
	@echo "remove db volumes"
	rm -rf db-data/auth-data
	@echo "remove images..."
	docker rmi pj-api-gateway:latest
	docker rmi pj-auth-service:latest