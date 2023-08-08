"use client";

import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import theme from "@/assets/gh-light.json";
import type monacoTypes from "monaco-editor";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/utils/cn";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const languages = [
  {
    name: "Plain Text",
    value: "plaintext",
  },
  {
    name: "JavaScript",
    value: "javascript",
  },
  {
    name: "TypeScript",
    value: "typescript",
  },
  {
    name: "Python",
    value: "python",
  },
  {
    name: "JSON",
    value: "json",
  },
  {
    name: "HTML",
    value: "html",
  },
  {
    name: "CSS",
    value: "css",
  },
  {
    name: "Markdown",
    value: "markdown",
  },
  {
    name: "Lua",
    value: "lua",
  },
  {
    name: "Go",
    value: "go",
  },
  {
    name: "Rust",
    value: "rust",
  },
  {
    name: "XML",
    value: "xml",
  },
  {
    name: "YAML",
    value: "yaml",
  },
  {
    name: "C++",
    value: "cpp",
  },
  {
    name: "C#",
    value: "csharp",
  },
  {
    name: "Java",
    value: "java",
  },
  {
    name: "Kotlin",
    value: "kotlin",
  },
  {
    name: "Dart",
    value: "dart",
  },
  {
    name: "Scala",
    value: "scala",
  },

  {
    name: "Ruby",
    value: "ruby",
  },
  {
    name: "PHP",
    value: "php",
  },
  {
    name: "Swift",
    value: "swift",
  },
  {
    name: "Solidity",
    value: "solidity",
  },
  {
    name: "SQL",
    value: "sql",
  },
  {
    name: "Dockerfile",
    value: "dockerfile",
  },
  {
    name: "Shell",
    value: "shell",
  },
  {
    name: "PowerShell",
    value: "powershell",
  },
  {
    name: "R",
    value: "r",
  },
  {
    name: "Perl",
    value: "perl",
  },
  {
    name: "GraphQL",
    value: "graphql",
  },
  {
    name: "Clojure",
    value: "clojure",
  },
  {
    name: "Objective-C",
    value: "objective-c",
  },
  {
    name: "PGSQL",
    value: "pgsql",
  },
  {
    name: "MySQL",
    value: "mysql",
  },
  {
    name: "Redis",
    value: "redis",
  },
];

export function MonacoEditor() {
  const monaco = useMonaco();
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false);
  const [selectedLanguage, setLanguage] = useState("plaintext");

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(
        "gh-light",
        theme as monacoTypes.editor.IStandaloneThemeData,
      );
      monaco.editor.setTheme("gh-light");
    }
  }, [monaco]);
  return (
    <div>
      <div className="grid grid-cols-2 px-4 py-2">
        <div className="flex flex-row items-center gap-4">
          <Logo className="h-6" />
          <Popover
            open={languageSelectOpen}
            onOpenChange={setLanguageSelectOpen}
          >
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                role="combobox"
                aria-expanded={languageSelectOpen}
                className="w-48 justify-between"
              >
                {selectedLanguage
                  ? languages.find(
                      (language) => language.value === selectedLanguage,
                    )?.name ?? "Plain Text" // ugly workaround
                  : "Select language..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-0" align="start">
              <Command>
                <CommandInput placeholder="Select language..." />
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-scroll">
                  {languages.map((language) => (
                    <CommandItem
                      key={language.value}
                      onSelect={(currentValue) => {
                        setLanguage(
                          currentValue === selectedLanguage ? "" : currentValue,
                        );
                        setLanguageSelectOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedLanguage === language.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {language.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-row items-center justify-end gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="rounded-sm bg-blue-500 px-6 hover:bg-blue-600"
              >
                Publish
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publish</DialogTitle>
                <DialogDescription>
                  Publish your code to the web.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="mb-4 w-full border-b" />
      <Monaco
        height="90vh"
        theme="gh-light"
        options={{
          fontSize: 14,
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        }}
        language={selectedLanguage}
        defaultLanguage="plaintext"
        defaultValue="console.log('Hello, world!');"
      />
    </div>
  );
}
