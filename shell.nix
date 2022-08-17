{ pkgs ? import <nixpkgs> {} }:

let
  lib = import <nixpkgs/lib>;
  buildNodejs = pkgs.callPackage <nixpkgs/pkgs/development/web/nodeJs/nodeJs.nix> { python = pkgs.python310; };

  NPM_CONFIG_PREFIX = toString ./npm_config_prefix;

in pkgs.mkShell {
  packages = with pkgs; [
    nodePackages.npm
    nodejs-16_x
  ];

  inherit NPM_CONFIG_PREFIX;

  shellHook = ''
    export PATH="${NPM_CONFIG_PREFIX}/bin:$PATH"
    export NODE_EXTRA_CA_CERTS="$HOME/dev/netskope/config/chainCA.crt"
  '';
}
