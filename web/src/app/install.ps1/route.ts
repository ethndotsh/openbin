export const runtime = "edge";

export async function GET() {
  // Fetches the install script from GitHub
  const res = await fetch(
    "https://raw.githubusercontent.com/ethndotsh/openbin/main/install.ps1",
  );
  // Returns the install script
  return new Response(res.body);
}
