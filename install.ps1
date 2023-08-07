# download latest release of the module from github: https://github.com/ethndotsh/openbin
# install the executable to the user's documents folder

# get the latest release
$latest = Invoke-RestMethod -Uri https://api.github.com/repos/ethndotsh/openbin/releases/latest

# get the download url for the latest release
$downloadUrl = $latest.assets | Where-Object { $_.name -eq 'openbin_windows.exe' } | Select-Object -ExpandProperty browser_download_url

# download the latest release
Invoke-WebRequest -Uri $downloadUrl -OutFile openbin_windows.exe

# install the executable to the user's documents folder in a folder called openbin
New-Item -ItemType Directory -Force -Path $env:USERPROFILE\Documents\openbin
Move-Item -Path openbin_windows.exe -Destination $env:USERPROFILE\Documents\openbin\openbin.exe

# add the executable to the user's path
$env:Path += ";$env:USERPROFILE\Documents\openbin"

# add the executable to the user's path permanently
[Environment]::SetEnvironmentVariable("Path", $env:Path, [EnvironmentVariableTarget]::User)
