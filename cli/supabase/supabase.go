package db

import (
	"github.com/ethndotsh/openbin/config"
	"github.com/nedpals/supabase-go"
)

const SUPABASE_URL = "https://okrxduhzkryvltkiqqzw.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcnhkdWh6a3J5dmx0a2lxcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4NjMwOTYsImV4cCI6MjAwNjQzOTA5Nn0.kWwjFrfN_gD0p7iSnQugIlTQGr3mviRiXZWw6jO64NI"

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
