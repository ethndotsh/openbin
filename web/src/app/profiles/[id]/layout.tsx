import { Navbar } from "@/components/navbar";
import {
  getProfile,
  getSession,
} from "@/utils/supabase";
import { ReactNode } from "react";

export default async function MeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) {
  const session = await getSession();
  const userProfile = await getProfile(session?.user.id);
  return (
    <>
      <Navbar session={session} profile={userProfile} />
      <div className="border-b" />
      {children}
    </>
  );
}
