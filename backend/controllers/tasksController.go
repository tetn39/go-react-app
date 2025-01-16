package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tetn39/go-react-app/initializers"
	"github.com/tetn39/go-react-app/models"
)

func GetTasks(c *gin.Context)  {
	var tasks []models.Task
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		return
	}

	result := initializers.DB.Where("user_id = ?", userID).Find(&tasks)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to get tasks",
		})
	}
	c.JSON(http.StatusOK, tasks)
}

func PostTasks(c *gin.Context) {
	var task models.Task

	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		return
	}
	task.UserID = userID.(uint)

	if err := c.BindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	initializers.DB.Create(&task)
	c.JSON(http.StatusOK, task)
}

func PutTasks(c *gin.Context) {
	var task models.Task
	id := c.Param("id")
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		return
	}

	if err := initializers.DB.Where("user_id = ?", userID).First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	var updatedTask models.Task
	if err := c.ShouldBindJSON(&updatedTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	task.Task = updatedTask.Task
	task.IsCompleted = updatedTask.IsCompleted
	initializers.DB.Save(&task)

	c.JSON(http.StatusOK, task)
}


func DeleteTasks(c *gin.Context) {
	var task models.Task
	id := c.Param("id")
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid token",
		})
		return
	}

	if err := initializers.DB.Where("user_id = ?", userID).First(&task, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	initializers.DB.Delete(&task)
	c.JSON(http.StatusOK, gin.H{"message": "Task deleted", "task": task})
}
