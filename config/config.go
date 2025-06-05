package config

import "github.com/evanw/esbuild/pkg/api"

const outdir = "dist"

var entryPoints = []string{"src/ts/index.ts"}

var Opts = api.BuildOptions{
	EntryPoints: entryPoints,
	Outdir:      outdir,
	Bundle:      true,
	Write:       true,
	LogLevel:    api.LogLevelInfo,
}
