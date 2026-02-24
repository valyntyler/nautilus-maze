package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	watch := flag.Bool("watch", false, "Watch for changes")
	flag.Parse()

	var opts = api.BuildOptions{
		EntryPoints: []string{"src/ts/index.ts"},
		Outdir:      "out",
		Bundle:      true,
		Write:       true,
		LogLevel:    api.LogLevelInfo,

		MinifyWhitespace:  true,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
	}

	if *watch {
		ctx, err := api.Context(opts)
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

		<-make(chan struct{})
	} else {
		result := api.Build(opts)
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
		}
	}
}
