package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

/*
gorm.Modelを使うと以下のようなフィールドが追加される

	ID        uint           `gorm:"primaryKey"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
*/
type Task struct {
	gorm.Model
	IsCompleted bool      `gorm:"default:false"`
	Task        string    `gorm:"size:255"`
}

func main() {
	fmt.Println("起動")

	// envファイルの読み込み
	err := godotenv.Load()
	if err != nil {
		fmt.Println("Error loading .env file")
	}

	// envから定義
	dbUser := os.Getenv("POSTGRES_USER")
	dbPass := os.Getenv("POSTGRES_PASSWORD")
	dbName := os.Getenv("POSTGRES_DB")
	dbHost := os.Getenv("POSTGRES_HOST")
	dbPort := os.Getenv("POSTGRES_PORT")

	// DB接続
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPass, dbName)
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("DB接続エラー", err)
	}

	// マイグレーション
	db.AutoMigrate(&Task{})

	r := gin.Default()
	// CORS設定
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// ルーティング
	r.GET("/getHello", getHello)
	r.GET("/getTest", getTest)

	// CRUD
	r.GET("/tasks", getTasks(db))
	r.POST("/tasks", postTasks(db))
	r.PUT("/tasks/:id", putTasks(db))
	r.DELETE("/tasks/:id", deleteTasks(db))

	r.Run(":8080")
}

func getTasks(db *gorm.DB) gin.HandlerFunc {
	fmt.Println("getTasks")
	return func(c *gin.Context) {
		var tasks []Task
		db.Find(&tasks)
		c.JSON(http.StatusOK, tasks)
	}
}

func postTasks(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var task Task
		if err := c.ShouldBindJSON(&task); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		db.Create(&task)
		c.JSON(http.StatusOK, task)
	}
}

func putTasks(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var task Task
		id := c.Param("id")

		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}

		var updatedTask Task
		if err := c.ShouldBindJSON(&updatedTask); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		task.Task = updatedTask.Task
		task.IsCompleted = updatedTask.IsCompleted
		db.Save(&task)

		c.JSON(http.StatusOK, task)
	}
}

func deleteTasks(db *gorm.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var task Task
		id := c.Param("id")

		if err := db.First(&task, id).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
			return
		}

		db.Delete(&task)
		c.JSON(http.StatusOK, gin.H{"message": "Task deleted", "task": task})
	}
}

// テスト用
func getTest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "てすと3",
	})
}

func getHello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Hello",
	})
}
