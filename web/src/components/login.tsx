"use client";

import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

export function LoginComponent({
  redirectTo,
  beforeLogin,
}: {
  redirectTo?: string;
  beforeLogin?: () => void;
}) {
  const supabase = createClientComponentClient();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function handleOAuthLogin(provider: Provider) {
    if (beforeLogin) beforeLogin();

    if ((globalThis as any).umami) {
      console.log("umami login");
      await (globalThis as any).umami.track("login-oauth", {
        provider,
      });
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: redirectTo
          ? `${location.origin}/auth/callback/${encodeURIComponent(redirectTo)}`
          : `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  }

  async function handleEmailLogin() {
    if (beforeLogin) beforeLogin();
    setLoading(true);
    const { error } = await supabase.auth
      .signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo
            ? `${location.origin}/auth/callback/${encodeURIComponent(
                redirectTo,
              )}`
            : `${location.origin}/auth/callback`,
        },
      })
      .then((res) => {
        setLoading(false);
        setCheckEmail(true);
        return res;
      });
  }

  return (
    <div className="mx-auto w-full space-y-2">
      {!checkEmail ? (
        <>
          <Button
            variant="outline"
            onClick={() => handleOAuthLogin("github")}
            className="w-full"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="mr-2 h-4 w-4 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
            GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("gitlab")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-4 w-4 shrink-0"
              viewBox="0 0 586 559"
            >
              <path
                fill="#e24329"
                d="m293 548.3 107.5-330.8H185.6L293 548.3z"
              />
              <path
                fill="#fca326"
                d="M35 217.5 2.3 318c-3 9.1.2 19.2 8.1 24.9L293 548.3 35 217.5z"
              />
              <path
                fill="#e24329"
                d="M35 217.5h150.6L120.8 18.3c-3.3-10.2-17.8-10.2-21.2 0L35 217.5z"
              />
              <path
                fill="#fca326"
                d="M551.2 217.5 583.8 318c3 9.1-.2 19.2-8.1 24.9L293 548.3l258.2-330.8z"
              />
              <path
                fill="#e24329"
                d="M551.2 217.5H400.6l64.7-199.2c3.3-10.2 17.8-10.2 21.2 0l64.7 199.2z"
              />
              <path
                fill="#fc6d26"
                d="m293 548.3 107.6-330.8h150.6zm0 0L35 217.5h150.6z"
              />
            </svg>
            GitLab
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin("bitbucket")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 62.4 62.4"
              className="mr-2 h-4 w-4 shrink-0"
            >
              <defs>
                <linearGradient
                  id="a"
                  x1="64"
                  x2="33"
                  y1="30.3"
                  y2="54.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset=".2" stopColor="#0052cc" />
                  <stop offset="1" stopColor="#2684ff" />
                </linearGradient>
              </defs>
              <g>
                <path
                  fill="#2684ff"
                  d="M2 3.1a2 2 0 0 0-2 2.4L8.5 57a2.7 2.7 0 0 0 2.7 2.3h40.7a2 2 0 0 0 2-1.7l8.5-52.1a2 2 0 0 0-2-2.4Zm35.8 37.3h-13L21.1 22H41Z"
                />
                <path
                  fill="url(#a)"
                  d="M59.7 25.1H40.9l-3.1 18.4h-13L9.3 61.7a2.7 2.7 0 0 0 1.8.7h40.7a2 2 0 0 0 2-1.7Z"
                  transform="translate(0 -3.1)"
                />
              </g>
            </svg>
            Bitbucket
          </Button>

          {/* <div className="grid grid-cols-3">
            <Button
              variant="outline"
              className="border-r-0 rounded-r-none"
              onClick={() => handleOAuthLogin("github")}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              GitHub
            </Button>
            <Button
              variant="outline"
              className="rounded-none"
              onClick={() => handleOAuthLogin("gitlab")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2 shrink-0"
                viewBox="0 0 586 559"
              >
                <path
                  fill="#e24329"
                  d="m293 548.3 107.5-330.8H185.6L293 548.3z"
                />
                <path
                  fill="#fca326"
                  d="M35 217.5 2.3 318c-3 9.1.2 19.2 8.1 24.9L293 548.3 35 217.5z"
                />
                <path
                  fill="#e24329"
                  d="M35 217.5h150.6L120.8 18.3c-3.3-10.2-17.8-10.2-21.2 0L35 217.5z"
                />
                <path
                  fill="#fca326"
                  d="M551.2 217.5 583.8 318c3 9.1-.2 19.2-8.1 24.9L293 548.3l258.2-330.8z"
                />
                <path
                  fill="#e24329"
                  d="M551.2 217.5H400.6l64.7-199.2c3.3-10.2 17.8-10.2 21.2 0l64.7 199.2z"
                />
                <path
                  fill="#fc6d26"
                  d="m293 548.3 107.6-330.8h150.6zm0 0L35 217.5h150.6z"
                />
              </svg>
              GitLab
            </Button>
            <Button
              variant="outline"
              className="border-l-0 rounded-l-none"
              onClick={() => handleOAuthLogin("bitbucket")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 62.4 62.4"
                className="w-4 h-4 mr-2 shrink-0"
              >
                <defs>
                  <linearGradient
                    id="a"
                    x1="64"
                    x2="33"
                    y1="30.3"
                    y2="54.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset=".2" stopColor="#0052cc" />
                    <stop offset="1" stopColor="#2684ff" />
                  </linearGradient>
                </defs>
                <g>
                  <path
                    fill="#2684ff"
                    d="M2 3.1a2 2 0 0 0-2 2.4L8.5 57a2.7 2.7 0 0 0 2.7 2.3h40.7a2 2 0 0 0 2-1.7l8.5-52.1a2 2 0 0 0-2-2.4Zm35.8 37.3h-13L21.1 22H41Z"
                  />
                  <path
                    fill="url(#a)"
                    d="M59.7 25.1H40.9l-3.1 18.4h-13L9.3 61.7a2.7 2.7 0 0 0 1.8.7h40.7a2 2 0 0 0 2-1.7Z"
                    transform="translate(0 -3.1)"
                  />
                </g>
              </svg>
              Bitbucket
            </Button>
          </div>
          <Input
            type="email"
            placeholder="ant@supabase.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <Button
            className="w-full"
            onClick={handleEmailLogin}
            loading={loading}
          >
            Login with magic link
          </Button> */}
        </>
      ) : (
        <div className="flex h-32 w-full items-center justify-center rounded-md border bg-white text-center">
          <p className="font-medium text-neutral-700">Check your email</p>
        </div>
      )}
    </div>
  );
}
