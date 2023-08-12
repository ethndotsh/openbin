import { LoadingSpinner } from "@/components/loading-spinner";

export default function Loading() {
  return (
    <div className="flex h-[90vh] w-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
