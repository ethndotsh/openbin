"use client";

import { useState } from "react";
import languages from "@/assets/languages.json";
import { Logo } from "../logo";
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
import { Session } from "@supabase/supabase-js";

export function Navbar({
  session,
  selectedLanguage,
  setLanguage,
}: {
  session: Session | null;
  selectedLanguage: string;
  setLanguage: (language: string) => void;
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
            {session?.user ? (
              <DialogHeader>
                <DialogTitle>Publish</DialogTitle>
                <DialogDescription>
                  Publish your code to the web.
                </DialogDescription>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle>Sign in</DialogTitle>
                <DialogDescription>
                  Sign in to publish your code to the web.
                </DialogDescription>
              </DialogHeader>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}