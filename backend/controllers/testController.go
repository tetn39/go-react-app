package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// テスト用
func GetTest(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "test from backend",
	})
}

func GetHello(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Get Hello",
	})
}
