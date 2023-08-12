"use client";

import { Session } from "@supabase/supabase-js";
import { Logo } from "./logo";
import Link from "next/link";
import { Avatar } from "./avatar";
import { Button } from "./ui/button";
import { Profile } from "types/types";

export function Navbar({
  rightActions,
  leftActions,
  session,
  profile,
}: {
  rightActions?: React.ReactNode | React.ReactNode[];
  leftActions?: React.ReactNode | React.ReactNode[];
  session: Session | null;
  profile: Profile | null;
}) {
  return (
    <nav className="grid grid-cols-2 px-4 py-2 md:px-8">
      <div className="flex flex-row items-center gap-4">
        <Link href="/">
          <Logo className="h-6" />
        </Link>

        {leftActions}
      </div>
      <div className="flex flex-row items-center justify-end gap-4">
        {session?.user ? (
          <Link href={`/profiles/${session.user.id}`}>
            <Avatar profile={profile} size="md" dropdown />
          </Link>
        ) : (
          <Link href="/login">
            <Button size="sm" variant="ghost">
              Sign in
            </Button>
          </Link>
        )}

        {rightActions}
      </div>
    </nav>
  );
}
