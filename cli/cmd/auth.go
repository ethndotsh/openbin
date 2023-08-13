package cmd

import (
	"errors"
	"fmt"
	"net"
	"net/http"
	"os/exec"
	"runtime"
	"time"

	sb "github.com/jackmerrill/supabase-go"
	"github.com/urfave/cli/v2"
)

var LoginCommand = cli.Command{
	Name:    "login",
	Aliases: []string{"auth", "signin"},
	Usage:   "Login to your Openbin account.",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:     "email",
			Aliases:  []string{"e"},
			Usage:    "Your Openbin account email.",
			Required: false,
		},
		&cli.StringFlag{
			Name:        "provider",
			Aliases:     []string{"p"},
			Usage:       "Your Openbin account provider.",
			Required:    false,
			DefaultText: "github",
		},
	},
	Action: func(cCtx *cli.Context) error {
		port := 8089

		// Check if port 8089 is available
		// TODO: Handle with greater grace
		conn, err := net.DialTimeout("tcp", "localhost:8089", time.Second)
		if err == nil || conn != nil {
			return errors.New("Could not obtain a port to complete authentication process.")
		}

		codeVerifier := ""
		if cCtx.String("email") != "" {
			d, err := supabase.Auth.SignInWithOtp(ctx, sb.OtpSignInOptions{
				Email:      cCtx.String("email"),
				RedirectTo: fmt.Sprintf("http://localhost:%d/auth-callback", port),
				FlowType:   sb.PKCE,
			})
			if err != nil {
				return err
			}

			codeVerifier = d.CodeVerifier

			fmt.Println("Check your email! 📧")
		} else {
			provider := cCtx.String("provider")

			if provider == "" {
				provider = "github"
			}

			d, err := supabase.Auth.SignInWithProvider(sb.ProviderSignInOptions{
				Provider:   provider,
				RedirectTo: fmt.Sprintf("http://localhost:%d/auth-callback", port),
				FlowType:   sb.PKCE,
			})

			if err != nil {
				return err
			}

			codeVerifier = d.CodeVerifier

			fmt.Printf("Please go to the following URL to login: %s\n", d.URL)
			switch runtime.GOOS {
			case "linux":
				err = exec.Command("xdg-open", d.URL).Start()
			case "windows":
				err = exec.Command("rundll32", "url.dll,FileProtocolHandler", d.URL).Start()
			case "darwin":
				err = exec.Command("open", d.URL).Start()
			if err != nil {	return err }
			}
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
			// fmt.Printf("Code: %s\n", code)
			// fmt.Printf("Code verifier: %s\n", codeVerifier)
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

		server := &http.Server{Addr: fmt.Sprintf(":%d", port)}

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
	Usage:   "Logout from your Openbin account.",
	Action: func(cCtx *cli.Context) error {
		settings.SetAccessToken("")
		settings.SetRefreshToken("")

		fmt.Println("Successfully logged out! 👋")

		return nil
	},
}
