package main

import (
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	result := api.Build(api.BuildOptions{
		EntryPoints: []string{
			"src/ts/pages/index.ts",
			"src/ts/pages/view/index.ts",
			"src/ts/pages/edit/index.ts",
		},
		Bundle: true,
		Outdir: "dist",
		Write:  true,
	})

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
