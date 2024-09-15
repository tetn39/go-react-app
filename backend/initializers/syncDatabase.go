package initializers

import (
	"github.com/tetn39/go-react-app/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Task{})
}