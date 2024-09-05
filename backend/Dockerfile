FROM golang:1.23

WORKDIR /go/src

COPY go* ./

RUN go mod download

RUN go mod tidy

COPY . .

CMD ["go", "run", "main.go"]
