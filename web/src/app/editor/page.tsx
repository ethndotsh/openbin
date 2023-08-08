import { MonacoEditor } from "@/components/monaco";

export default function Page() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex-1">
        <MonacoEditor />
      </div>
    </div>
  );
}
