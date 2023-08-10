import { createServerComponentClient, getSession } from "@/utils/supabase";
import { useParams } from "next/navigation";
import { PasteViewer } from "@/components/editor/viewer";

export default async function Paste({ params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createServerComponentClient();
  const session = await getSession();

  const { data: pasteData, error: pasteError } = await supabase
    .from("pastes")
    .select("*")
    .eq("id", id)
    .single();

  if (!pasteData) {
    throw new Error("Paste not found");
  }

  if (pasteError) {
    throw new Error(pasteError.message);
  }

  console.log(pasteData.file);

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
        <PasteViewer session={session} paste={pasteData} file={file} />
      </div>
    </div>
  );
}
