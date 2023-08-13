import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openbin",
  description:
    "Openbin is a free and open source pastebin alternative built with command-line users and developers in mind.",
  icons: {
    icon: [
      {
        url: "/assets/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/assets/favicon.png",
      },
    ],
  },

  openGraph: {
    title: "Openbin",
    description:
      "Openbin is a free and open source pastebin alternative built with command-line users and developers in mind.",
    url: "https://openbin.dev/",
    images: [
      {
        url: "/assets/image.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
      {/* TODO: Don't load Umami is GPC is present */}
      <script async defer data-website-id="6dfc7901-f71e-41e2-b090-3d41366700f4" src="https://analytics.umami.is/script.js"></script>  
    </html>
  );
}
