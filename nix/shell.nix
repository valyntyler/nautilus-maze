{
  mkShell,
  air,
  go,
  build,
  serve,
}:
mkShell {
  packages = [
    air
    go
    build
    serve
  ];
}
