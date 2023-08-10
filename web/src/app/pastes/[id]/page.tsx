import { createServerComponentClient, getSession } from "@/utils/supabase";
import { useParams } from "next/navigation";
import { PasteViewer } from "@/components/editor/viewer";
import { Profile } from "types/types";
import Link from "next/link";
import { Avatar } from "@/components/avatar";

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
        <div className="px-8 pb-2 pt-4">
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
        <div className="my-2 border-b" />
        <PasteViewer session={session} paste={pasteData} file={file} />
      </div>
    </div>
  );
}
