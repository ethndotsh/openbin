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

  console.log(1);

  // Check if we have a session
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  console.log(2);

  if (sessionError) {
    console.error("Error:", sessionError);
    throw sessionError;
  }

  console.log(3);

  if (session) {
    console.log(4);
    await supabase.auth.signOut(); // to be safe
    console.log(5);
    await supabaseServer.auth.admin.signOut(session.access_token);
    console.log(6);

    const { data, error } = await supabaseServer.auth.admin.deleteUser(
      session.user.id,
    );

    console.log(7);

    if (error) {
      console.error("Error:", error);
      throw error;
    }

    console.log(8);

    return NextResponse.redirect(new URL("/", req.url), {
      status: 302,
    });
  } else {
    console.log(9);
    return NextResponse.redirect(new URL("/", req.url), {
      status: 302,
    });
  }
}
