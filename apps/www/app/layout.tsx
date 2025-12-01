import "./globals.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import type React from "react";

export const metadata: Metadata = {
  title: "Dezso Meszaros",
  description:
    "Full-stack Product Engineer with 7+ years of experience in building products using TypeScript and a strong passion for UX and interaction design.",
  category: "portfolio",
  openGraph: {
    type: "website",
    images: ["/littler_me.jpg"],
    siteName: "Dezso Meszaros",
    url: "https://meszarosdezso.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/irc1jnn.css" />
      </head>
      <body
        className={`${GeistMono.className} overflow-x-hidden selection:bg-none selection:text-dirt bg-midnight`}
      >
        {children}
      </body>
    </html>
  );
}
