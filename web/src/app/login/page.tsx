"use client";

import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/logo";
import { Circles } from "@/components/svg/circles";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function handleGithubLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  async function handleEmailLogin() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
    });
  }

  return (
    <div>
      <main className="flex h-screen w-screen justify-center px-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl">
        <Circles />
        <div className="z-10">
          <section className="z-10 flex items-center text-center">
            <div className="my-4 space-y-8">
              <div className="flex w-full justify-center pt-8">
                <Logo className="h-6 text-neutral-800" />
              </div>

              <div className="pt-36">
                <h1 className="mt-1 text-3xl font-bold lg:text-4xl">Login</h1>

                <div className="mx-auto w-72 space-y-2 pt-8">
                  <div className="grid grid-cols-2">
                    <Button
                      variant="outline"
                      className="rounded-r-none"
                      onClick={handleGithubLogin}
                    >
                      <svg
                        role="img"
                        viewBox="0 0 24 24"
                        className="mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#000"
                      >
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                      </svg>
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      onClick={handleGoogleLogin}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4"
                        viewBox="0 0 186.69 190.5"
                      >
                        <g transform="translate(1184.583 765.171)">
                          <path
                            clipPath="none"
                            mask="none"
                            d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                            fill="#4285f4"
                          />
                          <path
                            clipPath="none"
                            mask="none"
                            d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                            fill="#34a853"
                          />
                          <path
                            clipPath="none"
                            mask="none"
                            d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                            fill="#fbbc05"
                          />
                          <path
                            d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                            fill="#ea4335"
                            clipPath="none"
                            mask="none"
                          />
                        </g>
                      </svg>
                      Google
                    </Button>
                  </div>
                  <Input
                    type="email"
                    placeholder="ant@supabase.com"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                  <Button className="w-full" onClick={handleEmailLogin} loading>
                    Login with magic link
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
