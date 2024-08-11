import "./globals.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Dezso Meszaros",
  description: "UI Engineer, based in Budapest.",
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
}): JSX.Element {
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
