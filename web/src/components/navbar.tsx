"use client";

import { Session } from "@supabase/supabase-js";
import { Logo } from "./logo";
import Link from "next/link";
import { Avatar } from "./avatar";
import { Button } from "./ui/button";

export function Navbar({
  rightActions,
  leftActions,
  session,
}: {
  rightActions?: React.ReactNode | React.ReactNode[];
  leftActions?: React.ReactNode | React.ReactNode[];
  session: Session | null;
}) {
  return (
    <nav className="grid grid-cols-2 px-4 py-2">
      <div className="flex flex-row items-center gap-4">
        <Link href={session?.user ? "/me" : "/"}>
          <Logo className="h-6" />
        </Link>

        {leftActions}
      </div>
      <div className="flex flex-row items-center justify-end gap-4">
        {session?.user ? (
          <Link href="/me">
            <Avatar id={session.user.id} size="md" />
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
