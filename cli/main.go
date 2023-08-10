package cli

import (
	"fmt"
	"log"
	"os"

	"github.com/ethndotsh/openbin/cli/cmd"
	"github.com/urfave/cli/v2"
)

func Run() {
	app := &cli.App{
		Name:                 "openbin",
		HelpName:             "openbin",
		EnableBashCompletion: true,
		Description:          "A CLI tool for OpenBin, a free and open-source pastebin alternative.",
		Flags: []cli.Flag{
			&cli.BoolFlag{
				Name: "version",
				Aliases: []string{
					"v",
				},
				Usage: "Print the version of openbin.",
			},
		},
		Action: func(cCtx *cli.Context) error {
			if cCtx.Bool("version") {
				fmt.Println("openbin version 1.0.3")
				return nil
			}
			fmt.Println("Welcome to openbin! Run `openbin help` to get started.")
			return nil
		},
		Commands: []*cli.Command{
			&cmd.LoginCommand,
			&cmd.LogoutCommand,
			&cmd.UploadCommand,
			&cmd.PastesCommand,
			&cmd.DeleteCommand,
		},
	}

	if err := app.Run(os.Args); err != nil {
		log.Fatal(err)
	}
}
