package models

import "gorm.io/gorm"

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