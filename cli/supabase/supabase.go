package db

import (
	"github.com/ethndotsh/openbin/cli/config"
	"github.com/jackmerrill/supabase-go"
)

// These are defined at build-time in /Makefile
var SUPABASE_URL string
var SUPABASE_KEY string

func New() *supabase.Client {
	supabaseClient := supabase.CreateClient(SUPABASE_URL, SUPABASE_KEY)
	return supabaseClient
}

func NewAuth() *supabase.Client {
	settings := config.New()

	if settings.AccessToken == "" {
		panic("No access token found. Please login with `openbin login`.")
	}

	return supabase.CreateClient(SUPABASE_URL, settings.AccessToken)
}
