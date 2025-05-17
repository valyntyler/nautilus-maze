package main

import (
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
	"valyntyler.com/nautilus-maze/config"
)

func main() {
	ctx, err := api.Context(config.Opts)

	if err != nil {
		fmt.Print("ERROR: ")
		fmt.Println(err)
		os.Exit(1)
	}

	err2 := ctx.Watch(api.WatchOptions{})
	if err2 != nil {
		fmt.Print("ERROR: ")
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println("watching...")

	// Returning from main() exits immediately in Go.
	// Block forever so we keep watching and don't exit.
	<-make(chan struct{})
}
