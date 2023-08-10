import { createServerComponentClient, getSession } from "@/utils/supabase";
import { useParams } from "next/navigation";
import { PasteViewer } from "@/components/editor/viewer";
import { Profile } from "types/types";
import Link from "next/link";

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
          <h1 className="text-3xl font-bold">
            {pasteData.title || "Untitled Paste"}
          </h1>
          <p className="text-sm text-gray-500">
            <Link
              className="hover:underline"
              href={`/profile/${(pasteData.author as unknown as Profile).id}`}
            >
              {((pasteData.author as unknown as Profile).username ||
                (pasteData.author as unknown as Profile).full_name) ??
                "Untitled User"}
            </Link>{" "}
            -{" "}
            {pasteData.created_at && (
              <time className="text-gray-500">
                {new Date(pasteData.created_at).toUTCString()}
              </time>
            )}
          </p>

          <p className="text-sm text-gray-500">{pasteData.language}</p>
          <p className="text-sm text-gray-500">{pasteData.description}</p>
        </div>
        <PasteViewer session={session} paste={pasteData} file={file} />
      </div>
    </div>
  );
}
