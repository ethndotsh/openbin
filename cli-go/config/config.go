package config

import (
	"encoding/json"
	"os"
	"path/filepath"
	"time"

	"github.com/kirsle/configdir"
)

type AppSettings struct {
	AccessToken  string
	RefreshToken string
	Expires      time.Time
}

func New() AppSettings {
	configPath := configdir.LocalConfig("openbin")

	// create the config file if it doesn't exist
	if err := configdir.MakePath(configPath); err != nil {
		panic(err)
	}

	configFile := filepath.Join(configPath, "settings.json")

	var settings AppSettings

	// create the config file if it doesn't exist
	if _, err := os.Stat(configFile); os.IsNotExist(err) {
		// Create the new config file.
		settings = AppSettings{}
		fh, err := os.Create(configFile)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		encoder := json.NewEncoder(fh)
		encoder.Encode(&settings)
	} else {
		// Load the existing file.
		fh, err := os.Open(configFile)
		if err != nil {
			panic(err)
		}
		defer fh.Close()

		decoder := json.NewDecoder(fh)
		decoder.Decode(&settings)
	}

	return settings
}

func (s *AppSettings) Save() {
	configPath := configdir.LocalConfig("openbin")
	configFile := filepath.Join(configPath, "settings.json")

	fh, err := os.OpenFile(configFile, os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		panic(err)
	}
	defer fh.Close()

	encoder := json.NewEncoder(fh)
	encoder.Encode(s)
}

func (s *AppSettings) SetAccessToken(token string) {
	s.AccessToken = token
	s.Save()
}

func (s *AppSettings) SetRefreshToken(token string) {
	s.RefreshToken = token
	s.Save()
}

func (s *AppSettings) GetAccessToken() string {
	return s.AccessToken
}

func (s *AppSettings) GetRefreshToken() string {
	return s.RefreshToken
}

func (s *AppSettings) SetTokenExpiry(expiry time.Time) {
	s.Expires = expiry
	s.Save()
}

func (s *AppSettings) GetTokenExpiry() time.Time {
	return s.Expires
}
