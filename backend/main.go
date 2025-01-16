package main

import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/tetn39/go-react-app/controllers"
	"github.com/tetn39/go-react-app/initializers"
	"github.com/tetn39/go-react-app/middleware"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDb()
	initializers.SyncDatabase()
}

func main() {
	fmt.Println("起動")

	r := gin.Default()
	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	// 認証が必要なルート
	authorized := r.Group("/")
	authorized.Use(middleware.RequireAuth)
	{
		authorized.GET("/tasks", controllers.GetTasks)
		authorized.POST("/tasks", controllers.PostTasks)
		authorized.PUT("/tasks/:id", controllers.PutTasks)
		authorized.DELETE("/tasks/:id", controllers.DeleteTasks)
		authorized.GET("/validate", controllers.Validate)
	}

	// 認証が不要なルート
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)
	r.POST("/logout", controllers.Logout)

	r.Run()
}
