package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := flag.Uint("port", 8080, "The serial port on which to run the server")
	flag.Parse()

	http.Handle("/", http.FileServer(http.Dir("./out")))

	fmt.Printf("Server open at http://localhost:%d\n", *port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", *port), nil)
	if err != nil {
		log.Fatal(err)
	}
}
