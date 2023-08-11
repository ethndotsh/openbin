import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!process.env.SUPABASE_SERVICE_KEY) {
    throw new Error("Missing env.SUPABASE_SERVICE_KEY");
  }

  const supabase = createServerActionClient({ cookies: () => cookies() });

  const supabaseServer = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
    { auth: { persistSession: false } },
  );

  // Check if we have a session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error:", sessionError);
    return;
  }

  if (session) {
    await supabase.auth.signOut(); // to be safe
    await supabaseServer.auth.admin.signOut(session.access_token);

    const { data, error } = await supabaseServer.auth.admin.deleteUser(
      session.user.id,
    );

    if (error) {
      console.error("Error:", error);
      return;
    }

    return NextResponse.redirect(new URL("/", req.url), {
      status: 302,
    });
  } else {
    return NextResponse.redirect(new URL("/", req.url), {
      status: 302,
    });
  }
}
