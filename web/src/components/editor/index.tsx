"use client";

import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import theme from "@/assets/gh-light.json";
import type monacoTypes from "monaco-editor";
import { useSearchParams } from "next/navigation";

import { Session } from "@supabase/supabase-js";
import { Navbar } from "./navbar";

const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function MonacoEditor({ session }: { session: Session | null }) {
  const monaco = useMonaco();
  const [selectedLanguage, setLanguage] = useState("plaintext");
  const [publishOpen, setPublishOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>("Welcome to Openbin!");
  const searchParams = useSearchParams();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(
        "gh-light",
        theme as monacoTypes.editor.IStandaloneThemeData,
      );
      monaco.editor.setTheme("gh-light");

      if (localStorage && searchParams.get("publish")) {
        const previousData = localStorage.getItem("editor-data");
        if (previousData) {
          setValue(previousData);
          setPublishOpen(true);
          // prompt publish
        }
      }
    }
  }, [monaco, searchParams]);
  return (
    <div>
      <Navbar
        session={session}
        selectedLanguage={selectedLanguage}
        setLanguage={setLanguage}
        value={value}
        publishOpen={publishOpen}
        setPublishOpen={setPublishOpen}
      />
      <div className="w-full border-b" />
      <Monaco
        height="90vh"
        theme="gh-light"
        value={value}
        onChange={setValue}
        options={{
          padding: {
            top: 16,
          },
          cursorSmoothCaretAnimation: "on",
          cursorBlinking: "smooth",
          fontSize: 14,
          formatOnType: true,
          formatOnPaste: true,
          automaticLayout: true,
          minimap: {
            enabled: false,
          },
        }}
        language={selectedLanguage}
        defaultLanguage="plaintext"
        defaultValue="Welcome to Openbin!"
      />
    </div>
  );
}
