package config

import (
	"path/filepath"
	"strings"
)

type FileType struct {
	Name       string   `json:"name"`
	Value      string   `json:"value"`
	Extensions []string `json:"extensions"`
}

// TODO: Cache AcceptedTypes locally and
//       update local AcceptedTypes based
//       on /web/assets/languages.json
var AcceptedTypes = []FileType{
	{
		Name:       "Plain Text",
		Value:      "plaintext",
		Extensions: []string{"txt"},
	},
	{
		Name:       "JavaScript",
		Value:      "javascript",
		Extensions: []string{"js", "jsx", "mjs", "cjs"},
	},
	{
		Name:       "TypeScript",
		Value:      "typescript",
		Extensions: []string{"ts", "mts", "cts", "tsx"},
	},
	{
		Name:       "Python",
		Value:      "python",
		Extensions: []string{"py"},
	},
	{
		Name:       "JSON",
		Value:      "json",
		Extensions: []string{"json"},
	},
	{
		Name:       "HTML",
		Value:      "html",
		Extensions: []string{"html"},
	},
	{
		Name:       "CSS",
		Value:      "css",
		Extensions: []string{"css"},
	},
	{
		Name:       "Markdown",
		Value:      "markdown",
		Extensions: []string{"md"},
	},
	{
		Name:       "Lua",
		Value:      "lua",
		Extensions: []string{"lua"},
	},
	{
		Name:       "Go",
		Value:      "go",
		Extensions: []string{"go"},
	},
	{
		Name:       "Rust",
		Value:      "rust",
		Extensions: []string{"rs"},
	},
	{
		Name:       "XML",
		Value:      "xml",
		Extensions: []string{"xml"},
	},
	{
		Name:       "YAML",
		Value:      "yaml",
		Extensions: []string{"yaml", "yml"},
	},
	{
		Name:       "MDX",
		Value:      "mdx",
		Extensions: []string{"mdx"},
	},
	{
		Name:       "SCSS",
		Value:      "scss",
		Extensions: []string{"scss"},
	},
	{
		Name:       "Less",
		Value:      "less",
		Extensions: []string{"less"},
	},
	{
		Name:       "Elixir",
		Value:      "elixir",
		Extensions: []string{"ex", "exs"},
	},
	{
		Name:       "C++",
		Value:      "cpp",
		Extensions: []string{"cpp"},
	},
	{
		Name:       "C#",
		Value:      "csharp",
		Extensions: []string{"cs"},
	},
	{
		Name:       "Java",
		Value:      "java",
		Extensions: []string{"java"},
	},
	{
		Name:       "Kotlin",
		Value:      "kotlin",
		Extensions: []string{"kt"},
	},
	{
		Name:       "Dart",
		Value:      "dart",
		Extensions: []string{"dart"},
	},
	{
		Name:       "Scala",
		Value:      "scala",
		Extensions: []string{"scala"},
	},
	{
		Name:       "Handlebars",
		Value:      "handlebars",
		Extensions: []string{"hbs", "handlebars"},
	},
	{
		Name:       "Pug",
		Value:      "pug",
		Extensions: []string{"pug"},
	},
	{
		Name:       "Ruby",
		Value:      "ruby",
		Extensions: []string{"rb"},
	},
	{
		Name:       "PHP",
		Value:      "php",
		Extensions: []string{"php"},
	},
	{
		Name:       "Swift",
		Value:      "swift",
		Extensions: []string{"swift"},
	},
	{
		Name:       "Solidity",
		Value:      "solidity",
		Extensions: []string{"sol"},
	},
	{
		Name:       "SQL",
		Value:      "sql",
		Extensions: []string{"sql"},
	},
	{
		Name:       "Dockerfile",
		Value:      "dockerfile",
		Extensions: []string{"dockerfile"},
	},
	{
		Name:       "Shell",
		Value:      "shell",
		Extensions: []string{"sh"},
	},
	{
		Name:       "PowerShell",
		Value:      "powershell",
		Extensions: []string{"ps1"},
	},
	{
		Name:       "R",
		Value:      "r",
		Extensions: []string{"r"},
	},
	{
		Name:       "Perl",
		Value:      "perl",
		Extensions: []string{"pl"},
	},
	{
		Name:       "GraphQL",
		Value:      "graphql",
		Extensions: []string{"graphql", "gql"},
	},
	{
		Name:       "Clojure",
		Value:      "clojure",
		Extensions: []string{"clj"},
	},
	{
		Name:       "Objective-C",
		Value:      "objective-c",
		Extensions: []string{"m"},
	},
}

func GetFileTypeByExtension(extension string) FileType {
	for _, acceptedType := range AcceptedTypes {
		for _, ext := range acceptedType.Extensions {
			if ext == extension {
				return acceptedType
			}
		}
	}
	return FileType{}
}

func GetFileTypeByValue(value string) FileType {
	for _, acceptedType := range AcceptedTypes {
		if acceptedType.Value == value {
			return acceptedType
		}
	}
	return FileType{}
}

func GetFileTypeByName(name string) FileType {
	for _, acceptedType := range AcceptedTypes {
		if acceptedType.Name == name {
			return acceptedType
		}
	}
	return FileType{}
}

func GetFileTypeByFilePath(filePath string) FileType {
	extension := GetFileExtension(filePath)
	return GetFileTypeByExtension(extension)
}

func GetFileExtension(filePath string) string {
	// Get the file extension
	extension := filepath.Ext(filePath)
	// Remove the dot
	extension = strings.Replace(extension, ".", "", -1)
	return extension
}

func IsFileTypeAllowed(ext string) bool {
	for _, acceptedType := range AcceptedTypes {
		for _, extension := range acceptedType.Extensions {
			if extension == ext {
				return true
			}
		}
	}
	return false
}

func IsFileTypeAllowedByValue(value string) bool {
	for _, acceptedType := range AcceptedTypes {
		if acceptedType.Value == value {
			return true
		}
	}
	return false
}

func GetAllowedTypes() []string {
	var allowedTypes []string
	for _, acceptedType := range AcceptedTypes {
		allowedTypes = append(allowedTypes, acceptedType.Value)
	}
	return allowedTypes
}
