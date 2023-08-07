import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/command.ts";
import supabaseClient from "../util/supabase.ts";
import {
  Session,
  User,
} from "https://esm.sh/v130/@supabase/gotrue-js@2.46.1/dist/module/index.js";
import { getPasteUrl } from "../util/helpers.ts";
import storage from "../util/storage.ts";

const PastesCommand = new Command()
  .name("pastes")
  .description("List your pastes")
  .alias("ls")
  .alias("list")
  .action(async () => {
    const session = await storage.get("session");
    const user = await storage.get("user");

    if (!session || !user) {
      console.error("You are not logged in.");
      Deno.exit(1);
    }

    const { data, error: sessionError } = await supabaseClient.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (sessionError) {
      console.error(sessionError);
      Deno.exit(1);
    }

    const { data: pastes, error } = await supabaseClient
      .from("pastes")
      .select("*")
      .eq("author", data.user?.id);

    if (error) {
      console.error(error);
      Deno.exit(1);
    }

    if (!pastes) {
      console.log("You have no pastes.");
      Deno.exit(0);
    }

    console.log("Your pastes:");

    for (const paste of pastes) {
      console.log(
        `- ${paste.title ?? "Untitled Paste"}: ${getPasteUrl(paste.id)} [${
          paste.private ? "Private" : "Public"
        }]`,
      );
    }
  });

export default PastesCommand;
