import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { redirect: string } },
) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const redirect = params.redirect;

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirect) {
    return NextResponse.redirect(
      new URL(decodeURIComponent(redirect), req.url),
    );
  }

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error:", sessionError);
    throw sessionError;
  }

  if (!session) {
    throw new Error("No session");
  }

  return NextResponse.redirect(
    new URL(`/profiles/${session.user.id}`, req.url),
  );
}
