import "./globals.css";
import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "Dezso Meszaros",
  description: "?",
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
        className={`${GeistMono.className} overflow-x-hidden bg-dirt dark:bg-midnight text-body dark:text-body-light`}
      >
        {children}
      </body>
    </html>
  );
}
