import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import storage from "../util/storage.ts";

const LogoutCommand = new Command()
  .name("logout")
  .alias("signout")
  .description("Logout from OpenBin")
  .action(() => {
    storage.delete("user");
    storage.delete("session");
    console.log("Logged out.");
  });

export default LogoutCommand;
