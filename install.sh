#!/bin/sh
# Inspired from the Deno install script: https://deno.land/x/install@v0.1.8/install.sh?source=

set -e

if [ "$OS" = "Windows_NT" ]; then
    target="windows"
    ext=".exe"
    case $(uname -m) in
    x86_64) arch="amd64" ;;
    aarch64) arch="arm64" ;;
    *)
        echo "Unsupported architecture: $(uname -m)"
        exit 1
        ;;
    esac
else
    ext=""
    case $(uname -sm) in
    "Darwin x86_64")
        target="darwin"
        arch="amd64"
        ;;
    "Darwin arm64")
        target="darwin"
        arch="arm64"
        ;;
    "Linux x86_64")
        target="linux"
        arch="amd64"
        ;;
    "Linux armv8")
        target="linux"
        arch="arm64"
        ;;
    *)
        echo "Unsupported platform: $(uname -sm)"
        exit 1
        ;;
    esac
fi

openbin_uri="https://github.com/ethndotsh/openbin/releases/latest/download/openbin-${target}-${arch}${ext}"

bin_dir="${HOME}/.openbin/bin"

if [ ! -d "$bin_dir" ]; then
    mkdir -p "$bin_dir"
fi

echo "Downloading binary..."

curl --fail --location --progress-bar --output "$bin_dir/openbin${ext}" "$openbin_uri"
chmod +x "$bin_dir/openbin${ext}"

echo "Installing binary..."

if command -v openbin >/dev/null; then
    echo "Run 'openbin --help' to get started"
else
    case $SHELL in
    /bin/zsh) shell_profile=".zshrc" ;;
    *) shell_profile=".bashrc" ;;
    esac
    echo "Adding openbin to $HOME/$shell_profile"
    echo "" >>"$HOME/$shell_profile"
    echo "# openbin" >>"$HOME/$shell_profile"
    echo "export PATH=\"$bin_dir:\$PATH\"" >>"$HOME/$shell_profile"
fi

# check for the "--no-alias" flag, if not present, add alias (`ob`)
if [ "$1" != "--no-alias" ]; then
    case $SHELL in
    /bin/zsh) shell_profile=".zshrc" ;;
    *) shell_profile=".bashrc" ;;
    esac
    echo "Adding openbin alias to $HOME/$shell_profile"
    echo "" >>"$HOME/$shell_profile"
    echo "# openbin alias" >>"$HOME/$shell_profile"
    echo "alias ob=openbin" >>"$HOME/$shell_profile"
fi

echo "🎉 Openbin Installed!"
echo ""
echo "Restart your shell or update your PATH:"
echo ""
echo "  export PATH=\"$bin_dir:\$PATH\""
echo ""
echo "Run 'openbin --help' to get started"
