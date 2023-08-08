package cmd

import (
	"context"
	"time"

	"github.com/ethndotsh/openbin/config"
	db "github.com/ethndotsh/openbin/supabase"
)

var ctx = context.Background()
var supabase = db.New()
var settings = config.New()

func init() {
	now := time.Now()

	if settings.AccessToken != "" && settings.RefreshToken != "" {
		if settings.Expires.Before(now) {
			// refresh the token
			token, err := supabase.Auth.RefreshUser(ctx, settings.AccessToken, settings.RefreshToken)

			if err != nil {
				panic(err)
			}

			// get expiry date
			expiryDate := time.Now().Add(time.Second * time.Duration(token.ExpiresIn))

			settings.SetAccessToken(token.AccessToken)
			settings.SetRefreshToken(token.RefreshToken)
			settings.SetTokenExpiry(expiryDate)

			supabase = db.New()
		}
	}
}
