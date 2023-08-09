import { cookies } from "next/headers";
import { cache } from "react";
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const createServerComponentClient = cache(() => {
  const cookieStore = cookies();
  return _createServerComponentClient({ cookies: () => cookieStore });
});

export async function getSession() {
  const supabase = createServerComponentClient();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
