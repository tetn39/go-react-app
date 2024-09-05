package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

// type fruit struct {
// 	ID   int    `json:"id"`
// 	Name string `json:"name"`
// 	Icon string `json:"icon"`
// }

// var fruits = []fruit{
// 	{ID: 1, Name: "apple", Icon: "🍎"},
// 	{ID: 2, Name: "banana", Icon: "🍌"},
// 	{ID: 3, Name: "grape", Icon: "🍇"},
// }

func main() {
	fmt.Println("起動")
	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World!",
		})
	})
	r.Run(":8080")
}
