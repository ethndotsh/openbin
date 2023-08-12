# Openbin

Openbin is a Pastebin clone that takes notes & code sharing to the next level, by taking advantage of both a CLI and a web editor. We built it for the 8th Supabase Launch Week hackathon, attempting to solve issues we face often while trying to share snippets and code with friends and colleagues. The app is built using Go for the CLI and Next.js, Tailwind, TypeScript and `shadcn/ui` for the web editor. We take advantage of a whole lot of Supabase products, including the Database, Auth, Storage and the brand new Resend email integration. 

# Documentation

## Installation

### Windows (Powershell)
```powershell
irm https://openbin.dev/install.ps1 | iex
```

### Linux and macOS
```shell
curl -fsSL https://openbin.dev/install.sh | sh
```

To make sure that Openbin is installed, enter `openbin --version` in your terminal. If it gives you the version, this means that Openbin has been successfully installed and you're ready to start using it! 🎉

## Login to your account
To get your pastes into your account, you should login to your Openbin account by entering this command:
```
openbin login
```
Also, if you want to logout of your account, all you have to do is `openbin logout` - it's that simple!
> Please note that you can't upload without being logged in, so this step is necessary to ensure a smooth functioning.
