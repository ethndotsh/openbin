import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Fetches the install script from GitHub
  const res = await fetch(
    "https://raw.githubusercontent.com/ethndotsh/openbin/main/install.ps1",
  );
  // Returns the install script
  return new Response(res.body);
}
