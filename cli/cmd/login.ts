import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import supabaseClient from "../util/supabase.ts";
import { Provider } from "https://esm.sh/v130/@supabase/supabase-js@2.31.0/dist/module/index.js";

const providers = ["github", "google"];

const LoginCommand = new Command()
  .name("login")
  .alias("signin")
  .alias("auth")
  .description(
    `Login to OpenBin ${
      localStorage.getItem("user") ? "(logged in)" : "(not logged in)"
    }`,
  )
  .usage("login")
  .type("provider", new EnumType(providers))
  .option(
    "-p, --provider [provider:provider]",
    "Set the provider to use to login",
    {
      default: "github",
    },
  )
  .option("-e, --email [email:string]", "Set the email to use to login")
  .action(async (options) => {
    if (options.email) {
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email: options.email.toString(),
        options: { emailRedirectTo: "http://localhost:8089/auth-callback" },
      });

      if (error) {
        console.error(error);
        Deno.exit(1);
      }
    } else {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: options.provider as Provider,
        options: { redirectTo: "http://localhost:8089/auth-callback" },
      });

      if (error) {
        console.error(error);
        Deno.exit(1);
      }

      if (data) {
        console.log(`Please go to the following URL to login:\n${data.url}`);
      }
    }

    const ac = new AbortController();

    Deno.serve(
      { signal: ac.signal, port: 8089, onListen: () => {} },
      async (req) => {
        const match = new URLPattern({ pathname: "/auth-callback" }).exec(
          req.url,
        );
        if (match) {
          const code = new URL(req.url).searchParams.get("code");

          if (code) {
            const {
              data: { user, session },
              error: codeError,
            } = await supabaseClient.auth.exchangeCodeForSession(code);

            if (codeError) {
              console.error(codeError);

              return new Response("Error", {
                status: 500,
              });
            }

            // Store the user in the local storage, because Deno is cool
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("session", JSON.stringify(session));

            setTimeout(() => {
              ac.abort();
            }, 1000);

            console.log("\nAuthenticated!");

            return new Response("You can now close this tab", {
              status: 200,
            });
          } else {
            setTimeout(() => {
              ac.abort();
            }, 1000);

            return new Response("No code found", {
              status: 500,
            });
          }
        } else {
          setTimeout(() => {
            ac.abort();
          }, 1000);

          return new Response("Not found", {
            status: 404,
          });
        }
      },
    );
  });

export default LoginCommand;
