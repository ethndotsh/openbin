"use client";

import { useState } from "react";
import languages from "@/assets/languages.json";
import { Logo } from "../logo";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { LoginComponent } from "../login";
import { publish } from "./publish";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { PublishForm } from "./publish-form";

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
import { Session } from "@supabase/supabase-js";
import { Input } from "../ui/input";

const publishSchema = z.object({
  title: z.string().trim().max(30),
  description: z.string().max(200),
  language: z.enum([
    languages[0]?.value as string,
    ...languages.slice(1).map((language) => language.value),
  ]),
  draft: z.boolean().default(false),
  expiresAt: z.date().nullable().default(null),
});

export function Navbar({
  session,
  selectedLanguage,
  setLanguage,
  value,
  publishOpen,
  setPublishOpen,
}: {
  session: Session | null;
  selectedLanguage: string;
  value: string | undefined;
  setLanguage: (language: string) => void;
  publishOpen: boolean;
  setPublishOpen: (open: boolean) => void;
}) {
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false);

  return (
    <div className="grid grid-cols-2 px-4 py-2">
      <div className="flex flex-row items-center gap-4">
        <Logo className="h-6" />
        <Popover open={languageSelectOpen} onOpenChange={setLanguageSelectOpen}>
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
        <Dialog open={publishOpen} onOpenChange={setPublishOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="rounded-sm bg-blue-500 px-6 hover:bg-blue-600"
            >
              Publish
            </Button>
          </DialogTrigger>
          <DialogContent>
            {session?.user ? (
              <>
                <DialogHeader>
                  <DialogTitle>Publish</DialogTitle>
                  <DialogDescription>
                    Publish your paste to the world.
                  </DialogDescription>
                </DialogHeader>
                <PublishForm selectedLanguage={selectedLanguage} pasteValue={value} />
              </>
            ) : (
              <>
                <DialogHeader>
                  <DialogTitle>Sign in</DialogTitle>
                  <DialogDescription>
                    Sign in to publish your paste.
                  </DialogDescription>
                </DialogHeader>
                <LoginComponent
                  redirectTo="/editor?publish=true"
                  beforeLogin={() => {
                    if (localStorage) {
                      localStorage.setItem("editor-data", value ?? "");
                    }
                  }}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
