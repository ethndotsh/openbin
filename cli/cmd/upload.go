package cmd

import (
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"time"

	"github.com/atotto/clipboard"
	uuid "github.com/doamatto/nobs-uuid"
	db "github.com/ethndotsh/openbin/supabase"
	"github.com/hairyhenderson/go-which"
	"github.com/pkg/browser"
	"github.com/urfave/cli/v2"
)

type UploadOptions struct {
	File        string
	Editor      string
	Private     bool
	Expire      string
	Title       string
	Description string
	Syntax      string
	Copy        bool
	Open        bool
	Quiet       bool
}

var UploadCommand = cli.Command{
	Name:    "upload",
	Aliases: []string{"u"},
	Usage:   "Upload a file to OpenBin.",
	Flags: []cli.Flag{
		&cli.StringFlag{
			Name:      "file",
			Aliases:   []string{"f"},
			Usage:     "The file to upload.",
			Required:  false,
			TakesFile: true,
		},
		&cli.StringFlag{
			Name:     "editor",
			Aliases:  []string{"E"},
			Usage:    "Set the editor to use to edit the paste. Must be the command executable (i.e. code, vim, nano, etc.)",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "private",
			Aliases:  []string{"p"},
			Usage:    "Set the paste to private.",
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
			Usage:    "Set the paste title.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "description",
			Aliases:  []string{"d"},
			Usage:    "Set the paste description.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "syntax",
			Aliases:  []string{"s"},
			Usage:    "Set the paste syntax.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "copy",
			Aliases:  []string{"c"},
			Usage:    "Copy the paste URL to the clipboard.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "open",
			Aliases:  []string{"o"},
			Usage:    "Open the paste URL in the browser.",
			Required: false,
		},
		&cli.StringFlag{
			Name:     "quiet",
			Aliases:  []string{"q"},
			Usage:    "Don't print anything to the console.",
			Required: false,
		},
	},
	Action: func(cCtx *cli.Context) error {
		args := UploadOptions{
			File:        cCtx.String("file"),
			Editor:      cCtx.String("editor"),
			Private:     cCtx.Bool("private"),
			Expire:      cCtx.String("expire"),
			Title:       cCtx.String("title"),
			Description: cCtx.String("description"),
			Syntax:      cCtx.String("syntax"),
			Copy:        cCtx.Bool("copy"),
			Open:        cCtx.Bool("open"),
			Quiet:       cCtx.Bool("quiet"),
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

			fmt.Println("Waiting for you to finish editing...")

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

			fmt.Println("Uploaded the file! 🎉")
			return nil
		}

		if args.File == "" && args.Editor == "" {
			return cli.Exit("You must specify a file or an editor.", 1)
		}

		if args.File != "" {
			UploadFile(args.File, args)
			fmt.Println("Uploaded the file! 🎉")
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
		"syntax":      opts.Syntax,
		"private":     opts.Private,
		"expires_at":  expires_at,
		"file":        fmt.Sprintf("pastes/openbin-%s.txt", id),
		"author":      user.ID,
	}).ExecuteWithContext(ctx, nil)

	if err != nil {
		cli.Exit("Could not upload the file.", 1)
	}

	fmt.Printf("https://openbin.vercel.app/paste/%s\n", id)

	if opts.Copy {
		// copy the URL to the clipboard
		clipboard.WriteAll(fmt.Sprintf("https://openbin.vercel.app/paste/%s", id))
	}

	if opts.Open {
		// open the URL in the browser
		browser.OpenURL(fmt.Sprintf("https://openbin.vercel.app/paste/%s", id))
	}
}
