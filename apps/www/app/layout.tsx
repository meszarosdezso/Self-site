import './globals.css'
import type { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'Dezso Meszaros',
  description: '?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/noise.png"
          loading="eager"
          className="fixed invisible inset-0 object-cover object-center h-full w-full saturate-0 mix-blend-screen opacity-10 brightness-200 invert pointer-events-none"
        />
      </body>
    </html>
  )
}
