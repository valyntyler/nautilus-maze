package main

import (
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"

	"github.com/evanw/esbuild/pkg/api"
)

func copyFile(src, dst string) error {
	in, err := os.Open(src)
	if err != nil {
		return err
	}
	defer func() {
		if cerr := in.Close(); cerr != nil {
			log.Printf("error closing source file %s: %v", src, cerr)
		}
	}()

	out, err := os.Create(dst)
	if err != nil {
		return err
	}
	defer func() {
		if cerr := out.Close(); cerr != nil {
			log.Printf("error closing destination file %s: %v", dst, cerr)
		}
	}()

	_, err = io.Copy(out, in)
	return err
}

func copyDir(src string, dst string) error {
	return filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		relPath, _ := filepath.Rel(src, path)
		targetPath := filepath.Join(dst, relPath)

		if info.IsDir() {
			return os.MkdirAll(targetPath, os.ModePerm)
		}
		return copyFile(path, targetPath)
	})
}

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

	if err := copyDir("src/public", "out"); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Copied src/public/ → out/")
}
