import { getSession } from "@/utils/supabase";
import { MonacoEditor } from "@/components/monaco";

export default async function Page() {
  const session = await getSession();

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-1">
        <MonacoEditor session={session} />
      </div>
    </div>
  );
}
