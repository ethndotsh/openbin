"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { zact } from "zact/server";
import languages from "@/assets/languages.json";
import { Database } from "types/supabase";
import { v4 as uuid } from "uuid";
import { redirect } from "next/navigation";

export const publish = zact(
  z.object({
    title: z.string().trim().min(2).max(30).optional(),
    description: z.string().trim().max(300).optional(),
    language: z.enum([
      languages[0]?.value as string,
      ...languages.slice(1).map((language) => language.value),
    ]),
    value: z.string().optional(),
    draft: z.boolean().default(false),
    expiresAt: z.date().optional(),
  }),
)(async (input) => {
  const supabase = createServerActionClient<Database>({ cookies });
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (!userData || userError) {
    throw new Error("Not logged in");
  }

  if (!input.value) {
    throw new Error("Paste is empty");
  }

  if (Buffer.byteLength(input.value, "utf8") / Math.pow(1024, 2) > 1) {
    throw new Error("Paste is too large");
  }

  const id = uuid();

  const { error: fileError } = await supabase.storage
    .from("pastes")
    .upload(`pastes/openbin-${id}.txt`, input.value);

  if (fileError) {
    throw new Error(fileError.message);
  }

  const { data: pasteData, error: pasteError } = await supabase
    .from("pastes")
    .insert({
      author: userData.user.id,
      title: input.title,
      description: input.description,
      language: input.language,
      draft: input.draft,
      expires_at: input.expiresAt ? input.expiresAt.toDateString() : null,
      file: `pastes/openbin-${id}.txt`,
    })
    .select("id");

  if (pasteError) {
    throw new Error("Failed to create paste");
  }

  return redirect(`/pastes/${pasteData[0]?.id}`);
});
