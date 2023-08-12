"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import languages from "@/assets/languages.json";
import * as z from "zod";
import { cn } from "@/utils/cn";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { ChevronsUpDown, Check, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useZact } from "zact/client";
import { publish } from "./actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const publishSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim()
    .max(30, {
      message: "Title must be less than 30 characters",
    }),
  description: z
    .string()
    .trim()
    .max(300, {
      message: "Description must be less than 300 characters",
    })

    .optional(),
  language: z.enum(
    [
      languages[0]?.value as string,
      ...languages.slice(1).map((language) => language.value),
    ],
    {
      invalid_type_error: "Invalid language",
      required_error: "Language is required",
    },
  ),
  draft: z.boolean().default(false),
  expiresAt: z.date().optional(),
  remixOf: z.string().optional(),
});

export function PublishForm({
  selectedLanguage,
  pasteValue,
  defaultValues,
}: {
  selectedLanguage: string;
  pasteValue: string | undefined;
  defaultValues?: Partial<z.infer<typeof publishSchema>>;
}) {
  const [languageSelectOpen, setLanguageSelectOpen] = useState(false);
  const form = useForm<z.infer<typeof publishSchema>>({
    resolver: zodResolver(publishSchema),
    defaultValues: {
      title: "",
      description: undefined,
      language: selectedLanguage,
      draft: false,
      expiresAt: undefined,
      ...defaultValues,
    },
  });
  const { mutate, data, isLoading, error } = useZact(publish);

  async function onSubmit(values: z.infer<typeof publishSchema>) {
    if ((globalThis as any).umami) {
      await (globalThis as any).umami.track("paste-created", {
        language: values.language,
        draft: values.draft,
        remix: !!values.remixOf,
      });

      if (values.remixOf) {
        await (globalThis as any).umami.track("paste-remix", {
          language: values.language,
        });
      }
    }

    mutate({
      ...values,
      value: pasteValue,
    }).then(() => {
      if (localStorage) {
        localStorage.removeItem("editor-data");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Title" className="m-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-0">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Popover
                    open={languageSelectOpen}
                    onOpenChange={setLanguageSelectOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        aria-expanded={languageSelectOpen}
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value,
                            )?.name ?? "Plain Text" // ugly workaround
                          : "Select language..."}
                        <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                              value={language.value}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue);
                                setLanguageSelectOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === language.value
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
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1">
                <FormLabel>Expiry</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(value) => {
                        value === field.value
                          ? field.onChange(undefined)
                          : field.onChange(value);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormDescription>
          After the expiry date, the paste will be deleted.
        </FormDescription>

        {error && <p className="py-2 text-red-600">{error.message}</p>}

        <div className="flex items-center gap-4 pt-3">
          <Button type="submit" className="" loading={isLoading}>
            Publish
          </Button>
          <FormField
            control={form.control}
            name="draft"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>Draft</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
