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

  let remixData: Paste | undefined;
  let remixContent: string | undefined;

  if (searchParams.remix) {
    const { data: rD, error: remixError } = await supabase
      .from("pastes")
      .select("*, author(*)")
      .eq("id", searchParams.remix)
      .single();

    if (!rD) {
      throw new Error("Remix not found");
    }

    if (remixError) {
      throw new Error(remixError);
    }

    const { data: fileData, error: fileError } = await supabase.storage
      .from("pastes")
      .download(rD.file);

    if (fileError) {
      throw new Error(fileError.message);
    }

    if (!fileData) {
      throw new Error("Discrepancy between paste and file");
    }

    const file = await fileData.text();

    remixData = rD;
    remixContent = file;
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
