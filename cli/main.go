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
		Flags:                []cli.Flag{},
		Action: func(cCtx *cli.Context) error {
			fmt.Println("Hello Openbin! 📋")
			fmt.Println("This is a CLI tool for OpenBin, a free and open-source pastebin alternative.")
			fmt.Println("Run `openbin --help` to see the available commands.")
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
