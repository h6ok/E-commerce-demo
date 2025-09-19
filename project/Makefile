build_gateway:
	@echo "building api-gateway..."
	cd ../api-gateway && GOOS=linux CGO_ENABLE=0 go build -o api-gateway ./cmd

build_auth:
	@echo "building authApp..."
	cd ../authentication-service && GOOS=linux CGO_ENABLE=0 go build -o authApp ./cmd

build_log:
	@echo "building logApp..."
	cd ../log-service && GOOS=linux CGO_ENABLE=0 go build -o logApp ./cmd	

build_mail:
	@echo "building mailApp..."
	cd ../mail-service && GOOS=linux CGO_ENABLE=0 go build -o mailApp ./cmd

build_notification:
	@echo "building notificationApp..."
	cd ../notification-service && GOOS=linux CGO_ENABLE=0 go build -o notificationApp ./cmd

build_product:
	@echo "building productApp..."
	cd ../product-service && GOOS=linux CGO_ENABLE=0 go build -o productApp ./cmd

build_purchase:
	@echo "building purchaseApp..."
	cd ../purchase-service && GOOS=linux CGO_ENABLE=0 go build -o purchaseApp ./cmd

build_front-end:
	@echo "building front-end"

up_build:build_gateway build_auth build_mail build_log build_notification build_product build_purchase
	@echo "building images..."
	docker compose down
	docker compose up -d

down:
	@echo "down all containers..."
	docker compose down -v

down_remove: down
		@echo "remove images..."
	- docker rmi project-purchase-service:latest
	- docker rmi project-api-gateway:latest
	- docker rmi project-auth-service:latest
	- docker rmi project-log-service:latest
	- docker rmi project-mail-service:latest
	- docker rmi project-notification-service:latest
	- docker rmi project-product-service:latest

