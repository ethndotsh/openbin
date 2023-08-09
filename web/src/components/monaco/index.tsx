"use client";

import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import theme from "@/assets/gh-light.json";
import type monacoTypes from "monaco-editor";

import { Session } from "@supabase/supabase-js";
import { Navbar } from "./navbar";



const Monaco = dynamic(() => import("@monaco-editor/react"), { ssr: false });

export function MonacoEditor({ session }: { session: Session | null }) {
  const monaco = useMonaco();
  const [selectedLanguage, setLanguage] = useState("plaintext");

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme(
        "gh-light",
        theme as monacoTypes.editor.IStandaloneThemeData,
      );
      monaco.editor.setTheme("gh-light");
    }
  }, [monaco]);
  return (
    <div>
      <Navbar
        session={session}
        selectedLanguage={selectedLanguage}
        setLanguage={setLanguage}
      />
      <div className="w-full border-b" />
      <Monaco
        height="90vh"
        theme="gh-light"
        options={{
          padding: {
            top: 16,
          },
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
        defaultValue="Welcome to Openbin!!"
      />
    </div>
  );
}
