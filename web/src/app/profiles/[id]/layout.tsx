import { Navbar } from "@/components/navbar";
import {
  createServerComponentClient,
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
  const profile = await getProfile(params.id);
  return (
    <>
      <Navbar session={session} profile={profile} />
      <div className="border-b" />
      {children}
    </>
  );
}
