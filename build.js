import * as esbuild from "esbuild";

const args = {
  entryPoints: ["./src/pages/index.ts"],
  bundle: true,
  minify: false,
  sourcemap: true,
  outdir: "./dist/",
};

if (process.argv.includes("--watch")) {
  let ctx = await esbuild.context(args);
  console.log("watching...");
  await ctx.watch();
} else {
  let result = await esbuild.build(args);
  console.log(result);
}
