package cmd

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
	"time"

	"github.com/atotto/clipboard"
	uuid "github.com/doamatto/nobs-uuid"
	"github.com/ethndotsh/openbin/cli/config"
	db "github.com/ethndotsh/openbin/cli/supabase"
	"github.com/hairyhenderson/go-which"
	"github.com/pkg/browser"
	"github.com/urfave/cli/v2"
)

type UploadOptions struct {
	File        string
	Editor      string
	Draft       bool
	Expire      string
	Title       string
	Description string
	Language    string
	Copy        bool
	Open        bool
	Quiet       bool
}

var UploadCommand = cli.Command{
	Name:      "upload",
	Aliases:   []string{"u"},
	Usage:     "Upload a file to OpenBin.",
	ArgsUsage: "[FILE]",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:     "editor",
			Aliases:  []string{"E"},
			Usage:    "Set the editor to use to edit the paste. Must be the command executable (i.e. code, vim, nano, etc.)",
			Required: false,
		},
		&cli.BoolFlag{
			Name:     "draft",
			Aliases:  []string{"d"},
			Usage:    "Set the paste to draft (private).",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "expire",
			Aliases:  []string{"e"},
			Usage:    "Set the paste to expire after a certain time.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "title",
			Aliases:  []string{"t"},
			Usage:    "Set the paste title. Use quotes if it has spaces.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "description",
			Usage:    "Set the paste description. Use quotes if it has spaces.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "language",
			Aliases:  []string{"l"},
			Usage:    "Set the paste language.",
			Required: false,
		},
		&cli.BoolFlag{
			Name:     "copy",
			Aliases:  []string{"c"},
			Usage:    "Copy the paste URL to the clipboard.",
			Required: false,
		},
		&cli.BoolFlag{
			Name:     "open",
			Aliases:  []string{"o"},
			Usage:    "Open the paste URL in the browser.",
			Required: false,
		},
		&cli.BoolFlag{
			Name:     "quiet",
			Aliases:  []string{"q"},
			Usage:    "Don't print anything to the console. Errors will still be printed.",
			Required: false,
		},
	},
	Action: func(cCtx *cli.Context) error {
		args := UploadOptions{
			File:        cCtx.Args().First(),
			Editor:      cCtx.String("editor"),
			Draft:       cCtx.Bool("draft"),
			Expire:      cCtx.String("expire"),
			Title:       cCtx.String("title"),
			Description: cCtx.String("description"),
			Language:    cCtx.String("language"),
			Copy:        cCtx.Bool("copy"),
			Open:        cCtx.Bool("open"),
			Quiet:       cCtx.Bool("quiet"),
		}

		if args.Language == "" {
			// Try to get the language from the file extension
			if args.File != "" {
				fileExt := config.GetFileExtension(args.File)
				if config.IsFileTypeAllowed(fileExt) {
					filetype := config.GetFileTypeByFilePath(args.File)
					args.Language = filetype.Value
				} else {
					return cli.Exit(fmt.Sprintf("The file type you specified is not allowed.\nYou specified: %s\nAllowed types: %s", config.GetFileExtension(args.File), strings.Join(config.GetAllowedTypes(), ", ")), 1)
				}
			}
		} else {
			// Check if the language is allowed
			if !config.IsFileTypeAllowedByValue(args.Language) {
				return cli.Exit(fmt.Sprintf("The file type you specified is not allowed.\nYou specified: %s\nAllowed types: %s", config.GetFileExtension(args.Language), strings.Join(config.GetAllowedTypes(), ", ")), 1)
			}
		}

		if args.Editor != "" {
			editorPath := which.Which(args.Editor)
			if editorPath == "" {
				return cli.Exit("The editor you specified could not be found.", 1)
			}

			path := ""

			if args.File == "" {
				// make a temporary file
				// open the editor

				f, err := ioutil.TempFile("", "openbin-*.txt")

				if err != nil {
					return cli.Exit("Could not create a temporary file.", 1)
				}

				path = f.Name()
			} else {
				path = args.File
			}

			if !args.Quiet {
				fmt.Println("Waiting for you to finish editing...")
			}

			if args.Editor == "code" {
				err := exec.Command(editorPath, "-r", "--wait", path).Run()

				if err != nil {
					return cli.Exit("Could not open the editor.", 1)
				}
			} else {
				err := exec.Command(editorPath, path).Run()

				if err != nil {
					return cli.Exit("Could not open the editor.", 1)
				}
			}

			// upload the file
			UploadFile(path, args)

			// delete the temporary file
			if args.File == "" {
				os.Remove(path)
			}

			if !args.Quiet {
				fmt.Println("Uploaded the file! 🎉")
			}
			return nil
		}

		if args.File == "" && args.Editor == "" {
			return cli.Exit("You must specify a file or an editor.", 1)
		}

		if args.File != "" {
			UploadFile(args.File, args)
			if !args.Quiet {
				fmt.Println("Uploaded the file! 🎉")
			}
		}

		return nil
	},
}

func UploadFile(path string, opts UploadOptions) {
	_, id, err := uuid.GenUUID()

	if err != nil {
		cli.Exit("Could not generate a UUID.", 1)
	}

	data, err := os.Open(path)

	if err != nil {
		cli.Exit("Could not open the file.", 1)
	}

	sbAuth := db.NewAuth()

	sbAuth.Storage.From("pastes").Upload(fmt.Sprintf("pastes/openbin-%s.txt", id), data)

	// expires_at should be a UTC string from this format: "MM-dd-yyyy hh:mm"

	var expires_at *time.Time

	if opts.Expire != "" {
		e, err := time.Parse(opts.Expire, "01-02-2006 03:04")

		if err != nil {
			cli.Exit("Could not parse the expiration date.", 1)
		}

		expires_at = &e
	}

	user, err := supabase.Auth.User(ctx, settings.AccessToken)

	if err != nil {
		cli.Exit("Could not get the user. Try signing in with `openbin login`.", 1)
	}

	supabase.DB.AddHeader("Authorization", fmt.Sprintf("Bearer %s", settings.AccessToken))

	err = supabase.DB.From("pastes").Insert(map[string]interface{}{
		"id":          id,
		"title":       opts.Title,
		"description": opts.Description,
		"language":    opts.Language,
		"draft":       opts.Draft,
		"expires_at":  expires_at,
		"file":        fmt.Sprintf("pastes/openbin-%s.txt", id),
		"author":      user.ID,
	}).ExecuteWithContext(ctx, nil)

	if err != nil {
		cli.Exit("Could not upload the file.", 1)
	}

	if !opts.Quiet {
		fmt.Printf("https://openbin.dev/pastes/%s\n", id)
	}

	if opts.Copy {
		// copy the URL to the clipboard
		err = clipboard.WriteAll(fmt.Sprintf("https://openbin.dev/pastes/%s", id))

		if err != nil {
			fmt.Println(err)
			cli.Exit("Could not copy the URL to the clipboard.", 1)
		}
	}

	if opts.Open {
		// open the URL in the browser
		err = browser.OpenURL(fmt.Sprintf("https://openbin.dev/pastes/%s", id))

		if err != nil {
			fmt.Println(err)
			cli.Exit("Could not open the URL in the browser.", 1)
		}
	}
}
