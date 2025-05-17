package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := 8080

	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("./dist"))))

	fmt.Printf("Server open at http://localhost:%d\n", port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
