package middleware

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
	"github.com/gin-gonic/gin"
	"github.com/tetn39/go-react-app/initializers"
	"github.com/tetn39/go-react-app/models"
)

func RequireAuth(c *gin.Context) {
	// クッキーからトークンを取得
	tokenString, err :=  c.Cookie("Authorization")

	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	// Parse takes the token string and a function for looking up the key. The latter is especially
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
    log.Printf("Failed to parse token: %v", err)
    c.AbortWithStatus(http.StatusUnauthorized)
    return
}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// トークンの有効期限を確認
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// ユーザーが存在するか確認
		var user models.User
		initializers.DB.First(&user, "id = ?", claims["sub"])

		if user.ID == 0{
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// ユーザー情報をコンテキストにセット
		c.Set("user", user)

		// 次のミドルウェアを実行
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}