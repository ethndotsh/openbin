import {
  Command,
  Type,
} from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import { which } from "https://deno.land/x/which@0.3.0/mod.ts";
import supabaseClient from "../util/supabase.ts";
import {
  Session,
  User,
} from "https://esm.sh/v130/@supabase/gotrue-js@2.46.1/dist/module/index.js";
import * as DateTime from "https://deno.land/std@0.197.0/datetime/mod.ts";
import { getPasteUrl } from "../util/helpers.ts";
import storage from "../util/storage.ts";

const UploadCommand = await new Command()
  .name("upload")
  .alias("up")
  .description("Upload a file to OpenBin")
  .option("-f, --file <file:file>", "Upload a file")
  .option(
    "-E, --editor <editor:string>",
    "Set the editor to use to edit the paste. Must be the command executable (i.e. code, vim, nano, etc.)",
  )
  .option("-p, --private", "Make the paste private")
  .option("-e, --expire <expire:string>", "Set the paste expiration date")
  .option("-t, --title <title:string>", "Set the paste title")
  .option("-d, --description <description:string>", "Set the paste description")
  .option("-s, --syntax <syntax:string>", "Set the paste syntax")
  .option("-c, --copy", "Copy the paste URL to the clipboard")
  .option("-o, --open", "Open the paste URL in the default browser")
  .option("-q, --quiet", "Do not print the paste URL")
  .option("-v, --verbose", "Print the paste URL")
  .action(async (options) => {
    if (options.editor) {
      // create a temporary file
      // open the file in the editor
      // upload the file
      // delete the temporary file

      const editorPath = await which(options.editor);

      if (!editorPath) {
        console.error(`Could not find editor ${options.editor}`);
        Deno.exit(1);
      }

      let path;

      if (!options.file) {
        path = Deno.makeTempFileSync({
          prefix: "openbin-",
          suffix: ".txt",
        });
      } else {
        path = options.file;
      }

      if (options.editor === "code") {
        console.log("Waiting for editor to close...");
        const out = new Deno.Command(
          editorPath,
          {
            args: ["-r", "-w", path!],
          },
        );

        try {
          await out.output();
        } catch (err) {
          console.log(err);
        }

        console.log("Uploading file...");
        await UploadFile(path!, {
          private: options.private,
          expire: options.expire
            ? DateTime.parse(options.expire, "MM-dd-yyyy hh:mm a")
            : null,
          title: options.title,
          description: options.description,
          syntax: options.syntax,
        });

        console.log("Deleting temporary file...");
        Deno.removeSync(path!);

        console.log("Done.");
        Deno.exit(0);
      }
    }

    if (!options.file && !options.editor) {
      console.error(
        "Please specify a file to upload, or use the --editor option to create a new one.",
      );
      Deno.exit(1);
    }

    if (options.file) {
      console.log("Uploading file...");
      await UploadFile(options.file, {
        private: options.private,
        expire: options.expire
          ? DateTime.parse(options.expire, "MM-dd-yyyy hh:mm a")
          : null,
        title: options.title,
        description: options.description,
        syntax: options.syntax,
      });

      console.log("Done.");
      Deno.exit(0);
    }
  });

async function UploadFile(path: string, options: {
  private?: boolean;
  expire?: Date | null;
  title?: string;
  description?: string;
  syntax?: string;
}): Promise<void> {
  const fileData = Deno.readTextFileSync(path);
  // random filename with "openbin-" prefix. make sure its scalable and unique
  const id = crypto.randomUUID();
  const fileName = `openbin-${id}`;

  const session: Session = await storage.get("session");
  let userId = null;

  if (session) {
    const { data, error: sessionError } = await supabaseClient.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    if (sessionError) {
      console.error(sessionError);
      Deno.exit(1);
    }

    userId = data.user?.id;
  }

  const { data, error } = await supabaseClient.storage.from("pastes").upload(
    `pastes/${fileName}.txt`,
    fileData,
    {
      contentType: "text/plain",
    },
  );

  if (error) {
    console.error(error);
    Deno.exit(1);
  }

  const { data: pasteData, error: pasteError } = await supabaseClient
    .from("pastes")
    .insert([
      {
        id, // use the same id as the filename
        title: options.title,
        description: options.description,
        syntax: options.syntax,
        private: options.private,
        expires_at: options.expire?.toUTCString(),
        file: data.path,
        author: userId,
      },
    ]).select().single();

  if (pasteError) {
    console.error(pasteError);
    Deno.exit(1);
  }

  console.log(
    `Uploaded! File link: ${getPasteUrl(pasteData?.id!)}`,
  );
}

export default UploadCommand;
