{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [go air];
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
      }
    );
}
