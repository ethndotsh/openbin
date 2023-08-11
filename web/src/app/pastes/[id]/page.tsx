import { createServerComponentClient, getSession } from "@/utils/supabase";
import { redirect, useParams } from "next/navigation";
import { PasteViewer } from "@/components/editor/viewer";
import { Profile } from "types/types";
import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import DeletePasteConfirmation from "@/components/editor/delete-paste";
import { FormEvent } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Metadata } from "next";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "types/supabase";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerComponentClient();
  // read route params
  const id = params.id;

  // fetch data
  const { data: paste, error } = await supabase
    .from("pastes")
    .select("*")
    .eq("id", id)
    .eq("draft", false)
    .single();

  if (error) {
    return {
      title: "Error",
      description: "Error retrieving paste",
    };
  }

  return {
    title: paste?.title ?? "Untitled Paste",
    description: paste?.description ?? undefined,
  };
}

export default async function Paste({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient();
  const session = await getSession();

  const { data: pasteData, error: pasteError } = await supabase
    .from("pastes")
    .select("*, author(*)")
    .eq("id", id)
    .single();

  if (!pasteData) {
    throw new Error("Paste not found");
  }

  if (pasteError) {
    throw new Error(pasteError);
  }

  const { data: fileData, error: fileError } = await supabase.storage
    .from("pastes")
    .download(pasteData.file);

  if (fileError) {
    throw new Error(fileError.message);
  }

  if (!fileData) {
    throw new Error("Discrepancy between paste and file");
  }

  const file = await fileData.text();

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-1">
        <div className="grid grid-cols-2 px-8 pb-2 pt-4">
          <div className="col-span-1">
            <p className="text-sm font-medium text-gray-500">
              <Link
                className="flex items-center gap-1 hover:underline"
                href={`/profile/${(pasteData.author as unknown as Profile).id}`}
              >
                <Avatar
                  size="xxs"
                  profile={pasteData.author as unknown as Profile}
                />
                {((pasteData.author as unknown as Profile).username ||
                  (pasteData.author as unknown as Profile).full_name) ??
                  "Untitled User"}
              </Link>
            </p>
            <h1 className="flex items-end gap-2 text-3xl font-bold">
              {pasteData.title || "Untitled Paste"}
              <span className="font-mono text-sm font-normal text-gray-500">
                {pasteData.language}
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              {pasteData.created_at && (
                <time className="text-gray-500">
                  {new Date(pasteData.created_at).toUTCString()}
                </time>
              )}
            </p>
            <p className="text-sm text-gray-500">{pasteData.description}</p>
          </div>

          <div className="col-span-1 flex items-center justify-end space-x-2">
            {(pasteData.author as unknown as Profile).id ===
              session?.user?.id && (
              <DeletePasteConfirmation paste={pasteData} />
            )}

            <Link
              href={`/editor?remix=${pasteData.id}`}
              className={buttonVariants({ variant: "outline" })}
            >
              Remix
            </Link>
          </div>
        </div>
        <div className="my-2 border-b" />
        <PasteViewer session={session} paste={pasteData} file={file} />
      </div>
    </div>
  );
}
