import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import LoginCommand from "./cmd/login.ts";
import UploadCommand from "./cmd/upload.ts";
import LogoutCommand from "./cmd/logout.ts";
import PastesCommand from "./cmd/pastes.ts";

await new Command()
  .name("openbin")
  .version("0.0.1")
  .description("Command line tool to upload pastes to OpenBin")
  .action(function () {
    this.showHelp();
  })
  .command("login", LoginCommand)
  .command("logout", LogoutCommand)
  .command("upload", UploadCommand)
  .command("pastes", PastesCommand)
  .parse(Deno.args);
