package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tetn39/go-react-app/controllers"
	"github.com/tetn39/go-react-app/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatbase()
}

func main() {
	fmt.Println("起動")

	r := gin.Default()
	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// ルーティング
	r.GET("/getHello", controllers.GetHello)
	r.GET("/getTest", controllers.GetTest)

	// TODOリスト CRUD
	r.GET("/tasks", controllers.GetTasks)
	r.POST("/tasks", controllers.PostTasks)
	r.PUT("/tasks/:id", controllers.PutTasks)
	r.DELETE("/tasks/:id", controllers.DeleteTasks)

	// ログイン機能
	r.POST("/signup", controllers.Signup)

	r.Run(":8080")
}