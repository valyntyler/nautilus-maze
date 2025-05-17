package main

import (
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
	"valyntyler.com/nautilus-maze/config"
)

func main() {
	result := api.Build(config.Opts)

	for _, msg := range result.Warnings {
		fmt.Print("WARNING: ")
		fmt.Println(msg.Text)
	}

	for _, msg := range result.Errors {
		fmt.Print("ERROR: ")
		fmt.Println(msg.Text)
	}

	if len(result.Errors) != 0 {
		os.Exit(1)
	} else {
		fmt.Println("Build successful!")
	}
}
