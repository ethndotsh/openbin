"use client";

export function getOS() {
  if (typeof window === "undefined") return "linux";
  const userAgent = window.navigator.userAgent.toLowerCase();
  const macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i;
  const windowsPlatforms = /(win32|win64|windows|wince)/i;
  let os = null;

  if (macosPlatforms.test(userAgent)) {
    os = "macos";
  } else if (windowsPlatforms.test(userAgent)) {
    os = "windows";
  } else {
    os = "linux";
  }

  return os;
}
