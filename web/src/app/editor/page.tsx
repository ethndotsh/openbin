import { getProfile, getSession } from "@/utils/supabase";
import { MonacoEditor } from "@/components/editor";

export default async function Page() {
  const session = await getSession();
  const profile = await getProfile();

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-1">
        <MonacoEditor session={session} profile={profile} />
      </div>
    </div>
  );
}
