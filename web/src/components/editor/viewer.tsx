"use client";

import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading-spinner";

import dynamic from "next/dynamic";

import theme from "@/assets/gh-light.json";

import type monacoTypes from "monaco-editor";
import { Database } from "types/supabase";
import { Navbar } from "../navbar";
import { Session } from "@supabase/supabase-js";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function PasteViewer({
  paste,
  file,
  session,
}: {
  paste: Database["public"]["Tables"]["pastes"]["Row"];
  file: string;
  session: Session | null;
}) {
  const monaco = useMonaco();

  return (
    <div>
      <Monaco
        height="90vh"
        theme="gh-light"
        value={file}
        loading={
          <div className="flex h-[90vh] w-screen items-center justify-center">
            <LoadingSpinner />
          </div>
        }
        options={{
          padding: {
            top: 16,
          },

          formatOnType: true,
          formatOnPaste: true,
          cursorSmoothCaretAnimation: "on",
          cursorBlinking: "smooth",

          domReadOnly: true,
          readOnly: true,
          readOnlyMessage: {
            value: "You cannot edit this paste.",
          },

          fontSize: 14,

          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        }}
        language={paste.language || "plaintext"}
        defaultLanguage="plaintext"
        defaultValue={file}
      />
    </div>
  );
}
