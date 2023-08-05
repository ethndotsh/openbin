import {
  createClient,
  SupportedStorage,
} from "https://esm.sh/@supabase/supabase-js@2.31.0";
import { Database } from "../../supabase/types.ts";

const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    return localStorage.getItem(key);
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
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
