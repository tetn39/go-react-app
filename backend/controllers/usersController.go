package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tetn39/go-react-app/initializers"
	"github.com/tetn39/go-react-app/models"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {
	var body struct {
		Email string
		Password string
	}

	if c.BindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to hash password",
		})
		
		return
	}

	user := models.User{
		Email: body.Email,
		Password: string(hash),
	}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create user",
		})
		
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "User created",
	})
}