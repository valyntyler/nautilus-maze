package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	port := flag.Uint("port", 8080, "The serial port on which to run the server")
	flag.Parse()

	dist := "./dist"

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(dist, r.URL.Path)

		if _, err := os.Stat(path); os.IsNotExist(err) {
			http.ServeFile(w, r, filepath.Join(dist, "index.html"))
			return
		}

		http.FileServer(http.Dir(dist)).ServeHTTP(w, r)
	})

	fmt.Printf("Server open at http://localhost:%d\n", *port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", *port), nil))
}
