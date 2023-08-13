import { Navbar } from "@/components/navbar";
import { getProfile, getSession } from "@/utils/supabase";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthDeleteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    return redirect("/");
  }

  const profile = await getProfile(session.user.id);
  return (
    <>
      <Navbar session={session} profile={profile} />
      <div className="border-b" />
      {children}
    </>
  );
}
