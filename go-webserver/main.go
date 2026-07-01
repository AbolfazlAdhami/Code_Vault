package main

import (
	"fmt"
	"net/http"

	"web-server/handlers"
)

func main() {
	mux := http.NewServeMux()

	//  Routes
	mux.HandleFunc("/", handlers.Home)
	mux.HandleFunc("/form", handlers.Form)
	mux.HandleFunc("/user", handlers.User)

	// Static Files
	fs := http.FileServer(http.Dir("./static"))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	fmt.Println("Server running at http://localhost:8080 ")

	err := http.ListenAndServe(":8080", mux)
	if err != nil {
		fmt.Println("Error starting server:", err)
		panic(err)
	}
}
