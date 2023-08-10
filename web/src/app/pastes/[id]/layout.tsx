import { Navbar } from "@/components/navbar";
import { createServerComponentClient, getSession } from "@/utils/supabase";
import { ReactNode } from "react";

export default async function PasteLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  return (
    <>
      <Navbar session={session} />
      <div className="border-b" />
      {children}
    </>
  );
}
