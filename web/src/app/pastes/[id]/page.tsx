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

import { Disc3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublishUnpublishButton } from "@/components/editor/toggle-publish";
import { validate } from "uuid";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createServerComponentClient();
  const session = await getSession();
  // read route params
  const id = params.id;

  // fetch data
  const { data: paste, error } = await supabase
    .from("pastes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return {
      title: "Error",
      description: "Error retrieving paste",
    };
  }

  if (paste.draft && paste.author !== session?.user?.id) {
    return {
      title: "Openbin",
    };
  }

  return {
    title: `${paste?.title ?? "Untitled Paste"} - Openbin`,
    description: paste?.description ?? undefined,
  };
}

export default async function Paste({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient();
  const session = await getSession();

  if (!validate(id)) {

    notFound();
  }

  const { data: pasteData, error: pasteError } = await supabase
    .from("pastes")
    .select("*, author(*)")
    .eq("id", id)
    .single();

  if (!pasteData || pasteError) {
    notFound();
  }

  if (pasteError) {
    throw new Error(pasteError);
  }

  if (
    pasteData.draft &&
    (pasteData.author as unknown as Profile).id !== session?.user.id
  ) {
    notFound();
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
        <div className="grid px-4 py-4 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-sm font-medium text-gray-500">
              <Link
                className="flex items-center gap-1 hover:underline"
                href={`/profiles/${
                  (pasteData.author as unknown as Profile).id
                }`}
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
            <h1 className="flex items-center gap-2 text-3xl font-bold">
              {pasteData.title || "Untitled Paste"}
            </h1>
            <p>
              <span className="font-mono text-sm font-normal text-gray-500">
                {pasteData.language}
              </span>{" "}
              <span className="font-mono text-sm font-normal text-red-600">
                {pasteData.draft && "(draft)"}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              {pasteData.created_at && (
                <time className="text-gray-500">
                  {new Date(pasteData.created_at).toUTCString()}
                </time>
              )}
            </p>
            <p className="text-sm text-gray-500">{pasteData.description}</p>
          </div>

          <div className="mt-4 items-center justify-end space-x-0 space-y-2 md:hidden">
            <PublishUnpublishButton
              paste={pasteData}
              display={
                (pasteData.author as unknown as Profile).id ===
                session?.user?.id
              }
            />
            <div className="flex flex-row items-center space-x-2 md:inline">
              <Link
                href={`/editor?remix=${pasteData.id}`}
                className="block w-full md:w-auto"
              >
                <Button variant="outline" className="w-full md:w-auto">
                  <Disc3 className="mr-2 h-4 w-4" />
                  Remix
                </Button>
              </Link>

              {(pasteData.author as unknown as Profile).id ===
                session?.user?.id && (
                <DeletePasteConfirmation paste={pasteData} />
              )}
            </div>
          </div>
          <div className="hidden items-center justify-end space-x-2 md:flex">
            <PublishUnpublishButton
              paste={pasteData}
              display={
                (pasteData.author as unknown as Profile).id ===
                session?.user?.id
              }
            />
            <Link
              href={`/editor?remix=${pasteData.id}`}
              className="block w-full md:w-auto"
            >
              <Button variant="outline" className="w-full md:w-auto">
                <Disc3 className="mr-2 h-4 w-4" />
                Remix
              </Button>
            </Link>

            {(pasteData.author as unknown as Profile).id ===
              session?.user?.id && (
              <DeletePasteConfirmation paste={pasteData} />
            )}
          </div>
        </div>
        <div className="border-b" />
        <PasteViewer session={session} paste={pasteData} file={file} />
      </div>
    </div>
  );
}
