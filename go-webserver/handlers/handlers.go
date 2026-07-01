package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"web-server/models"
)

func Home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/index.html")
}

func Form(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}
	name := r.FormValue("name")
	email := r.FormValue("email")

	fmt.Fprintf(w, "Received:\nName: %s\nEmail: %s", name, email)
}

func User(w http.ResponseWriter, r *http.Request) {
	user := models.User{
		ID:    1,
		Name:  "Abolfazl",
		Email: "abolfazl@example.com",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
