FROM alpine:latest

RUN mkdir /app

COPY mailApp /app

COPY template/ /app

CMD ["/app/mailApp"]