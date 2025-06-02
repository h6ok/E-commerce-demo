FROM alpine:latest

RUN mkdir /app

COPY authApp /app

CMD ["go run /app/authApp"]