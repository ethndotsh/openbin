import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "types/supabase";

export async function middleware(req: NextRequest) {
  // get the id param from the request
  const id = new URL(req.url).searchParams.get("id");

  // if the id is not present, redirect to the homepage
  if (!id) {
    return {
      status: 302,
      headers: {
        location: "/",
      },
    };
  }

  const res = NextResponse.next();

  const supabase = createMiddlewareClient<Database>({ req, res });

  // get the paste from the database
  const { data: paste, error } = await supabase
    .from("pastes")
    .select("author, draft")
    .eq("id", id)
    .single();

  // if there is an error, return a 500
  if (error) {
    return {
      status: 500,
      body: error.message,
    };
  }

  // if there is no paste, return a 404
  if (!paste) {
    return {
      status: 404,
      body: "Not found",
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // if there is an error, return a 500
  if (userError) {
    return {
      status: 500,
      body: userError.message,
    };
  }

  // if the paste is a draft, and the user is not the author, return a 404
  if (paste.draft && paste.author !== user?.id) {
    return {
      status: 404,
      body: "Not found",
    };
  }

  // otherwise, return the response
  return res;
}
