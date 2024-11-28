FROM golang:1.23

WORKDIR /go/src

COPY go* ./

RUN go mod download

RUN go install github.com/air-verse/air@latest

RUN go mod tidy

COPY . .

# CMD ["go", "run", "main.go"]
CMD ["air", "-c", ".air.toml"]
