FROM alpine:latest

RUN mkdir /app

COPY authApp /app

COPY config/config.json /config/config.json

CMD ["/app/authApp"]