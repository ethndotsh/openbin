package cmd

import (
	"fmt"
	"time"

	"github.com/urfave/cli/v2"
)

type CustomTime struct {
	time.Time
}

const customLayout = "2006-01-02T15:04:05.999999"

// Implement the UnmarshalJSON method for CustomTime
func (ct *CustomTime) UnmarshalJSON(data []byte) error {
	// Remove the surrounding quotes from the JSON string
	if string(data) == "null" {
		return nil
	}
	trimmedData := data[1 : len(data)-1]
	parsedTime, err := time.Parse(customLayout, string(trimmedData))
	if err != nil {
		return err
	}
	ct.Time = parsedTime
	return nil
}

type Paste struct {
	ID          string     `json:"id"`
	CreatedAt   CustomTime `json:"created_at,omitempty"`
	Author      string     `json:"author"`
	File        string     `json:"file"`
	Draft       bool       `json:"draft"`
	ExpiresAt   CustomTime `json:"expires_at,omitempty"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Language    string     `json:"language"`
}

var PastesCommand = cli.Command{
	Name:    "pastes",
	Aliases: []string{"ls", "list"},
	Usage:   "Manage your pastes.",
	Action: func(cCtx *cli.Context) error {
		user, err := supabase.Auth.User(ctx, settings.AccessToken)

		if err != nil || user == nil {
			cli.Exit("You don't seem to be signed in. Try running `openbin login` to sign in.", 1)
		}

		supabase.DB.AddHeader("Authorization", fmt.Sprintf("Bearer %s", settings.AccessToken))

		var pastes []Paste
		err = supabase.DB.From("pastes").Select("*").Eq("author", user.ID).Execute(&pastes)

		if err != nil {
			cli.Exit("Could not get the pastes.", 1)
			return err
		}

		for _, paste := range pastes {
			visibility := "Public"

			if paste.Draft {
				visibility = "Draft"
			}

			title := paste.Title

			if title == "" {
				title = "Untitled Paste"
			}

			fmt.Printf("\n- %s: %s [%s]\n", title, fmt.Sprintf("https://openbin.dev/paste/%s", paste.ID), visibility)
		}

		return nil
	},
}
