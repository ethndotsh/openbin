package cmd

import (
	"fmt"

	db "github.com/ethndotsh/openbin/cli/supabase"
	"github.com/urfave/cli/v2"
)

var DeleteCommand = cli.Command{
	Name:      "delete",
	Aliases:   []string{"del", "rm"},
	Usage:     "Delete a paste.",
	ArgsUsage: `PASTE_ID`,
	Action: func(cCtx *cli.Context) error {
		pasteId := cCtx.Args().First()

		if pasteId == "" {
			cli.Exit("Please provide a paste ID.", 1)
		}

		user, err := supabase.Auth.User(ctx, settings.AccessToken)

		if err != nil {
			cli.Exit("You don't seem to be signed in. Try running `openbin login` to sign in.", 1)
			return err
		}

		supabase.DB.AddHeader("Authorization", fmt.Sprintf("Bearer %s", settings.AccessToken))

		var paste []Paste

		err = supabase.DB.From("pastes").Select("file").Eq("id", pasteId).Eq("author", user.ID).Execute(&paste)

		if err != nil {
			cli.Exit("Could not get the paste.", 1)
			return err
		}

		if len(paste) == 0 {
			cli.Exit("Could not find the paste.", 1)
			return err
		}

		err = supabase.DB.From("pastes").Delete().Eq("id", pasteId).Execute(nil)

		if err != nil {
			cli.Exit("Could not delete the paste.", 1)
			return err
		}

		sbAuth := db.NewAuth()

		sbAuth.Storage.From("pastes").Remove([]string{paste[0].File})

		fmt.Println("Deleted the paste! 🗑️")

		return nil
	},
}
