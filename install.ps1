#!/usr/bin/env pwsh
# Inspired from the Deno install script: https://deno.land/x/install@v0.1.8/install.ps1?source=

$ErrorActionPreference = "Stop"

$BinDir = "${Home}\.openbin\bin"

$DownloadUrl = "https://github.com/ethndotsh/openbin/releases/latest/download/openbin-windows-amd64.exe"

$DownloadPath = "${BinDir}\openbin.exe"

if (!(Test-Path $BinDir)) {
  New-Item -ItemType Directory -Force -Path $BinDir
}

curl.exe -Lo $DownloadPath $DownloadUrl

$User = [System.EnvironmentVariableTarget]::User
$Path = [System.Environment]::GetEnvironmentVariable("Path", $User)
if (!(";${Path};".ToLower() -like "*;${BinDir}:*".ToLower())) {
    [System.Environment]::SetEnvironmentVariable("Path", "${Path};${BinDir}", $User)
    $Env:Path += ";${BinDir}"
}

# check for the "NoAlias" flag, if it's set, we'll skip aliasing. Alias to `ob`
if ($args[0] -ne "--no-alias") {
  $Alias = "ob"
  if (Test-Path alias:\$Alias) {
    # if the alias already exists, don't remove it, but warn the user
    Write-Host "⚠️  The alias '$Alias' is already in your PowerShell profile. We won't change it."
    } else {
    # if the alias doesn't exist, add it
    New-Item -Path $PROFILE.CurrentUserAllHosts -ItemType File -Force
    Add-Content -Path $PROFILE.CurrentUserAllHosts -Value "Set-Alias -Name $Alias -Value $DownloadPath"
    Write-Host "Alias '$Alias' created!"
  }
}

Write-Host "🎉  Openbin Installed!"
Write-Host ""
Write-Host "Run 'openbin --help' to get started"