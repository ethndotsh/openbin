"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex h-[90vh] w-screen flex-col items-center justify-center text-center">
      <AlertTriangle className="h-10 w-10 text-red-600" />
      <h1 className="mt-2 text-xl font-medium">Error rendering paste</h1>
    </div>
  );
}
