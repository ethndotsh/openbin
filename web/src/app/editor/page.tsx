import {
  createServerComponentClient,
  getProfile,
  getSession,
} from "@/utils/supabase";
import { MonacoEditor } from "@/components/editor";
import { Paste } from "types/types";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { remix?: string };
}) {
  const session = await getSession();

  const profile = await getProfile(session?.user.id);
  const supabase = createServerComponentClient();

  let remixContent: string | undefined;
  let remixData: Paste | undefined;

  if (searchParams.remix) {
    const { data, error } = await supabase
      .from("pastes")
      .select("*, author(*)")
      .eq("id", searchParams.remix)
      .single();

    if (!data) {
      throw new Error("Remix not found");
    }

    if (error) {
      throw new Error(error);
    }

    const { data: fileData, error: fileError } = await supabase.storage
      .from("pastes")
      .download(data.file);

    if (fileError) {
      throw new Error(fileError.message);
    }

    if (!fileData) {
      throw new Error("Discrepancy between paste and file");
    }

    const file = await fileData.text();

    remixContent = file;
    remixData = data;
  }

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-1">
        <MonacoEditor
          session={session}
          profile={profile}
          remixData={remixData}
          remixContent={remixContent}
        />
      </div>
    </div>
  );
}
