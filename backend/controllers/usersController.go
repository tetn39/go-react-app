package controllers

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/tetn39/go-react-app/initializers"
	"github.com/tetn39/go-react-app/models"
	"golang.org/x/crypto/bcrypt"
)

func Signup(c *gin.Context) {

	// リクエストボディを取得
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

	// パスワードをハッシュ化
	hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to hash password",
		})
		
		return
	}

	// すでにユーザーが存在するか
	var count int64
	initializers.DB.Model(&models.User{}).Where("email = ?", body.Email).Count(&count)

	if count > 0 {
		c.JSON(http.StatusConflict, gin.H{
			"error": "User already exists",
		})	
			
		return	
	}

	
	// ユーザーを作成
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

func Login(c *gin.Context) {

	// リクエストボディを取得
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

	// ユーザーを取得
	var user models.User
	initializers.DB.First(&user, "email = ?", body.Email)

	if user.ID == 0 {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalied emaill or password",
		})
		
		return
	}

	// パスワードの比較
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password))

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalied emaill or password",
		})

		return
	}

	// JWTトークンを作成
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	// トークンを文字列に変換
	tokenString, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create token",
		})
		
		return
	}
	
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", tokenString, 3600 * 24 * 30, "", "", false, true)

	c.JSON(http.StatusOK, gin.H{})
}

func Validate(c *gin.Context) {
	user, _ := c.Get("user")
	c.JSON(http.StatusOK, gin.H{
		"message": user,
	})
}