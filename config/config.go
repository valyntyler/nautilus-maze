package config

import "github.com/evanw/esbuild/pkg/api"

const outdir = "dist"

var entryPoints = []string{
	"src/ts/pages/index.ts",
	"src/ts/pages/view/index.ts",
	"src/ts/pages/edit/index.ts",
}

var Opts = api.BuildOptions{
	EntryPoints: entryPoints,
	Outdir:      outdir,
	Bundle:      true,
	Write:       true,
}
