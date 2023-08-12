import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Openbin",
  description: "Openbin is a free and open source pastebin alternative.",
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
    description: "Openbin is a free and open source pastebin alternative.",
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
    </html>
  );
}
