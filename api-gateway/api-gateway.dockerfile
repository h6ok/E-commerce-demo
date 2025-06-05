FROM alpine:latest

RUN mkdir /app

COPY api-gateway /app

COPY config/config.json /config/config.json

CMD ["/app/api-gateway"]