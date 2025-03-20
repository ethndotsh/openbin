import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import { validate } from "uuid";

import type { NextRequest } from "next/server";
import { BASE_URL } from "./utils/config";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if user is signed in and the current path is / redirect the user to /account

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && req.nextUrl.pathname.startsWith("/auth/delete")) {
    return NextResponse.redirect(new URL(`/login`, BASE_URL));
  }

  if (validate(req.nextUrl.pathname.slice(1))) {
    return NextResponse.redirect(
      new URL(`/pastes/${req.nextUrl.pathname.slice(1)}`, BASE_URL),
    );
  }

  return res;
}

export const config = {
  matcher: ["/:path*"],
};
