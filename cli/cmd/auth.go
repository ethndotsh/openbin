package cmd

import (
	"fmt"
	"net/http"
	"time"

	sb "github.com/nedpals/supabase-go"
	"github.com/urfave/cli/v2"
)

var LoginCommand = cli.Command{
	Name:    "login",
	Aliases: []string{"auth", "signin"},
	Usage:   "Login to your OpenBin account.",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:     "email",
			Aliases:  []string{"e"},
			Usage:    "Your OpenBin account email.",
			Required: false,
		},
		&cli.StringFlag{
			Name:        "provider",
			Aliases:     []string{"p"},
			Usage:       "Your OpenBin account provider.",
			Required:    false,
			DefaultText: "github",
		},
	},
	Action: func(cCtx *cli.Context) error {
		codeVerifier := ""
		if cCtx.String("email") != "" {
			supabase.Auth.SendMagicLink(ctx, cCtx.String("email"))

			fmt.Println("Check your email! 📧")
		} else {
			provider := cCtx.String("provider")

			if provider == "" {
				provider = "github"
			}

			d, err := supabase.Auth.SignInWithProvider(sb.ProviderSignInOptions{
				Provider:   provider,
				RedirectTo: "http://localhost:8089/auth-callback",
				FlowType:   sb.PKCE,
			})

			if err != nil {
				return err
			}

			codeVerifier = d.CodeVerifier

			fmt.Printf("Please go to the following URL to login: %s\n", d.URL)
		}

		stopServer := make(chan bool)

		// start a server to listen for the redirect
		//
		// 1. create a server
		// 2. listen for the redirect
		// 3. get the token
		// 4. save the token to the config file
		// 5. return a success message
		http.HandleFunc("/auth-callback", func(w http.ResponseWriter, r *http.Request) {
			// get the code
			code := r.URL.Query().Get("code")

			// get the token
			token, err := supabase.Auth.ExchangeCode(ctx, sb.ExchangeCodeOpts{
				AuthCode:     code,
				CodeVerifier: codeVerifier,
			})

			if err != nil {
				fmt.Println(err)
			}

			// get expiry date
			expiryDate := time.Now().Add(time.Second * time.Duration(token.ExpiresIn))

			settings.SetAccessToken(token.AccessToken)
			settings.SetRefreshToken(token.RefreshToken)
			settings.SetTokenExpiry(expiryDate)

			fmt.Println("Successfully logged in! 🎉")

			// close the server
			w.Write([]byte("Successfully logged in! 🎉"))

			stopServer <- true
		})

		server := &http.Server{Addr: ":8089"}

		go func() {
			if err := server.ListenAndServe(); err != nil {
				fmt.Println(err)
			}
		}()

		<-stopServer

		if err := server.Shutdown(ctx); err != nil {
			fmt.Println(err)
		}

		return nil
	},
}

var LogoutCommand = cli.Command{
	Name:    "logout",
	Aliases: []string{"signout"},
	Usage:   "Logout from your OpenBin account.",
	Action: func(cCtx *cli.Context) error {
		settings.SetAccessToken("")
		settings.SetRefreshToken("")

		fmt.Println("Successfully logged out! 👋")

		return nil
	},
}
