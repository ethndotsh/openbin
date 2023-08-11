import { cookies } from "next/headers";
import { cache } from "react";
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "types/supabase";

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export async function getSession() {
  const supabase = createServerComponentClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getProfile(id: string) {
  const supabase = createServerComponentClient();
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return profile;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function getPastes(author: string) {
  const supabase = createServerComponentClient();
  try {
    const { data: pastes, error } = await supabase
      .from("pastes")
      .select("*")
      .eq("author", author)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return pastes;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
