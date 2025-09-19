FROM alpine:latest

RUN mkdir /app

COPY purchaseApp /app

COPY config/config.json /config/config.json

CMD ["/app/purchaseApp"]

