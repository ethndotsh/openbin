"use client";

import { v4 as uuidv4 } from "uuid";
import React, { useEffect, useState } from "react";

interface Line {
  text: string;
  cmd: boolean;
  delay?: number;
  loading?: (remaining: number) => { text: string; delay: number };
}

const lines = [
  {
    text: "npm i -g openbin",
    cmd: true,
    delay: 1000,
  },
  {
    text: "Installed successfully.",
    cmd: false,
    delay: 1000,
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
    text: `File uploaded successfully, accessible at https://openbin.dev/pastes/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`,
    cmd: false,
  },
] as Line[];

interface TerminalProps {
  lines: Line[];
}
const Terminal = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [rendering, setRendering] = useState(true);
  const [commandLine, setCommandLine] = useState(true);

  useEffect(() => {
    const typeLine = async (line: Line) => {
      for (let i = 0; i < line.text.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
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

    if (currentLine < lines.length) {
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
    } else {
      setRendering(false);
    }
  }, [currentLine]);

  return (
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
  );
};

export { Terminal };
