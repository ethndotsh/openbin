"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getOS } from "@/utils/os";

interface Line {
  text: string;
  cmd: boolean;
  delay?: number;
  loading?: (remaining: number) => { text: string; delay: number };
}

function getLines(os: string) {
  return [
    {
      text: `${
        os === "windows"
          ? "irm https://openbin.ethn.sh/install.ps1 | iex"
          : "curl -fsSL https://openbin.ethn.sh/install.sh | sh"
      }`,
      cmd: true,
      delay: 1000,
    },
    {
      text: "Downloading binary...",
      cmd: false,
      delay: 400,
    },
    {
      text: "Installing Openbin...",
      cmd: false,
      delay: 200,
    },
    {
      text: "🎉 Openbin Installed",
      cmd: false,
      delay: 800,
    },
    {
      text: "ob upload index.ts",
      cmd: true,
    },
    {
      text: "Uploading file...",
      delay: 1000,
      cmd: false,
    },
    {
      text: "",
      cmd: false,
    },
    {
      text: `File uploaded successfully, accessible at https://openbin.ethn.sh/pastes/xxxxxxxx`,
      cmd: false,
    },
  ] as Line[];
}

const Terminal = () => {
  const [lines, setLines] = useState<Line[] | undefined>();
  const [os, setOs] = useState<string | undefined>();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [rendering, setRendering] = useState(true);
  const [commandLine, setCommandLine] = useState(true);

  useEffect(() => {
    const operatingSystem = getOS();
    setLines(getLines(operatingSystem));
    setOs(operatingSystem);
  }, []);

  useEffect(() => {
    const typeLine = async (line: Line) => {
      for (let i = 0; i < line.text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 110));
        setDisplayText((prev) => prev + line.text[i]);
      }
      setDisplayText((prev) => prev + "\n");
      if (line.delay) {
        await new Promise((resolve) => setTimeout(resolve, line.delay));
      }
      setCurrentLine((prev) => prev + 1);
      if (line.cmd) {
        setCommandLine(false);
      }
    };

    if (lines && currentLine < lines.length) {
      const line = lines[currentLine];
      if (line && line.cmd) {
        setCommandLine(true);
        setDisplayText((prev) => prev + "kiwi ~ $ ");
        typeLine(line);
      } else if (line) {
        setDisplayText((prev) => prev + line.text + "\n");
        if (line.delay) {
          new Promise((resolve) => setTimeout(resolve, line.delay)).then(() => {
            setRendering(true);
            setCurrentLine((prev) => prev + 1);
          });
        } else {
          setCurrentLine((prev) => prev + 1);
        }
      }
    } else if (lines) {
      setRendering(false);
    }
  }, [currentLine, lines]);

  return (
    <>
      <div className="relative h-9 rounded-t-md bg-neutral-50">
        {os === "windows" ? (
          <div className="absolute right-0 top-0 flex h-full flex-row items-center gap-1 pr-3">
            <X className="h-4 w-4" />
          </div>
        ) : os === "linux" || os === "macos" ? (
          <div className="absolute left-0 top-0 flex h-full flex-row items-center gap-1 pl-3">
            <div className="h-3.5 w-3.5 rounded-full bg-red-500" />
            <div className="h-3.5 w-3.5 rounded-full bg-yellow-500" />
            <div className="h-3.5 w-3.5 rounded-full bg-green-500" />
          </div>
        ) : (
          <></>
        )}

        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <p className="text-sm font-medium">
            kiwi@copple —{" "}
            {os === "macos"
              ? "zsh"
              : os === "windows"
              ? "powershell"
              : os === "linux"
              ? "terminal"
              : "..."}{" "}
          </p>
        </div>
      </div>
      <div className="wrap h-64 w-full whitespace-pre-wrap rounded-b-md bg-[#262626] p-2 text-sm text-white">
        <pre className="whitespace-pre-wrap">
          {displayText}
          {commandLine && (
            <span
              style={{ animation: "1s blink step-end infinite" }}
              className="text-fuchsia-500"
            >
              █
            </span>
          )}
        </pre>
        {!rendering && (
          <div className="font-mono">
            <span className="">kiwi ~ $</span>{" "}
            <span
              style={{ animation: "1s blink step-end infinite" }}
              className="text-fuchsia-500"
            >
              █
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export { Terminal };
