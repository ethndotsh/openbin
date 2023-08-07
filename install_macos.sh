# download latest release of the module from github: https://github.com/ethndotsh/openbin
# install the executable to the user's home directory
# add the executable to the user's path

# get the latest release
curl -s https://api.github.com/repos/ethndotsh/openbin/releases/latest \
| grep "browser_download_url.*openbin_macos" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -qi -

# add the executable to the user's path
chmod +x openbin_macos
mv openbin_macos /usr/local/bin/openbin
