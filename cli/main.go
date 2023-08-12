package cli

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/ethndotsh/openbin/cli/cmd"
	"github.com/urfave/cli/v2"
)

const VERSION = "1.0.7"

type GitHubResponse struct {
	TagName string `json:"tag_name"`
}

func Run() {
	app := &cli.App{
		Name:                 "openbin",
		HelpName:             "openbin",
		EnableBashCompletion: true,
		Description:          "A CLI tool for Openbin, a free and open-source pastebin alternative built primarily for command-line warriors.",
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
				fmt.Println("openbin version " + VERSION)
				return nil
			}
			fmt.Println("Welcome to openbin! Run `openbin help` to get started.")
			return nil
		},
		After: func(cCtx *cli.Context) error {
			// Check for updates, and if there are any, notify the user.
			res, err := http.Get("https://api.github.com/repos/ethndotsh/openbin/releases/latest")
			if err != nil {
				// If there's an error, just return.
				return nil
			}

			if res.StatusCode != 200 {
				// If there's an error, just return.
				return nil
			}

			// Get the "tag_name" field from the JSON response.
			// This is the latest version of openbin.
			// If there is a newer version, notify the user.

			var response GitHubResponse

			defer res.Body.Close()

			body, err := ioutil.ReadAll(res.Body)

			if err != nil {
				return nil
			}

			err = json.Unmarshal(body, &response)

			if err != nil {
				return nil
			}

			if compareVersions(VERSION, response.TagName) == -1 {
				fmt.Printf("There is a new version of openbin available! You are running %s, and the latest version is %s.\n", VERSION, response.TagName)
				fmt.Println("You can update by running whatever command you used to install openbin.")
			}

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

func compareVersions(a string, b string) int {
	// check the major, minor, and patch versions
	// if a > b, return 1
	// if a < b, return -1
	// if a == b, return 0

	// split the versions into arrays
	aArr := strings.Split(a, ".")
	bArr := strings.Split(b, ".")

	// compare the major versions
	if aArr[0] > bArr[0] {
		return 1
	} else if aArr[0] < bArr[0] {
		return -1
	}

	// compare the minor versions
	if aArr[1] > bArr[1] {
		return 1
	} else if aArr[1] < bArr[1] {
		return -1
	}

	// compare the patch versions
	if aArr[2] > bArr[2] {
		return 1
	} else if aArr[2] < bArr[2] {
		return -1
	}

	return 0
}
