FROM alpine:latest

RUN mkdir /app

COPY productApp /app

COPY config/config.json /config/config.json

CMD ["/app/productApp"]
