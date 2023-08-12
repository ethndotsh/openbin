"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div className="flex h-[90vh] w-screen flex-col items-center justify-center text-center">
      <h1 className="text-xl font-medium">{error.message}</h1>
    </div>
  );
}
