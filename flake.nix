{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-parts.url = "github:hercules-ci/flake-parts";
  };

  outputs = inputs @ {flake-parts, ...}:
    flake-parts.lib.mkFlake {inherit inputs;} {
      systems = ["x86_64-linux" "aarch64-linux" "aarch64-darwin" "x86_64-darwin"];
      perSystem = {pkgs, ...}: rec {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            air
            go
            packages.build
            packages.serve
          ];
        };

        packages = let
          src = ./.;
          vendorHash = "sha256-urFdCCyMIyyGN2Suuj8l1utLj7unGnk54dMly5+eajY=";
        in {
          build = pkgs.buildGoModule {
            inherit src vendorHash;
            name = "build";
          };
          serve = pkgs.buildGoModule {
            inherit src vendorHash;
            name = "serve";
          };
        };
      };
    };
}
