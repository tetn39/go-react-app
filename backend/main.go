package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
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
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin"},
	}))

	r.GET("/getHello", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "てすと",
		})
	})

	r.Run(":8080")
}
