import { Database } from "./supabase";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Paste = Database["public"]["Tables"]["pastes"]["Row"];
