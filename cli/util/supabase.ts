import {
  createClient,
  SupportedStorage,
} from "https://esm.sh/v130/@supabase/supabase-js@2.32.0?alias=@supabase/gotrue-js:@jackmerrill/gotrue-js";
import { Database } from "../../supabase/types.ts";
import storage from "./storage.ts";

const customStorageAdapter: SupportedStorage = {
  getItem: async (key) => {
    return await storage.get(key);
  },
  setItem: (key, value) => {
    storage.set(key, value);
  },
  removeItem: (key) => {
    storage.delete(key);
  },
};

const supabaseClient = createClient<Database>(
  "https://okrxduhzkryvltkiqqzw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9rcnhkdWh6a3J5dmx0a2lxcXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA4NjMwOTYsImV4cCI6MjAwNjQzOTA5Nn0.kWwjFrfN_gD0p7iSnQugIlTQGr3mviRiXZWw6jO64NI",
  {
    auth: {
      persistSession: false,
      flowType: "pkce",
      storage: customStorageAdapter,
    },
  },
);

export default supabaseClient;
