package db

import (
	"github.com/ethndotsh/openbin/cli/config"
	"github.com/jackmerrill/supabase-go"
)

const SUPABASE_URL = "https://yjcmvygieeqeptqmiykg.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqY212eWdpZWVxZXB0cW1peWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NDE0NjgsImV4cCI6MjA1ODAxNzQ2OH0.9vyMbaYpYKrXC9WlTrEuFdyVglhaNxoUV4t9d9mfgJA"

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
