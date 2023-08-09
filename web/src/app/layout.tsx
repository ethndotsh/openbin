import "./globals.css";
import { Metadata as NextMetadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface Metadata extends NextMetadata {
  ogImage?: string;
}

export const metadata: Metadata = {
  title: "Openbin",
  description: "Openbin is a free and open source pastebin alternative.",
  ogImage: "/assets/image.png",  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
