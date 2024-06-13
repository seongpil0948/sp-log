import { fontSans } from '@/config/fonts'
import { siteConfig } from '@/config/site'
import '@/styles/globals.css'


import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import clsx from 'clsx'

import { Providers } from './_providers'

import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

export const viewport: Viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({children}: {children: ReactNode}) {
  const NEXT_PUBLIC_ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          crossOrigin="use-credentials"
          rel="preconnect"
          href={`https://${NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <script async src="http://localhost:8097" />
      </head>
      <body
        className={clsx('min-h-screen bg-background font-sans antialiased m-0 p-0 overflow-hidden', fontSans.variable)}
      >
        <Providers
          themeProps={{
            attribute: 'data-theme',
            // attribute: "class",
            children: <></>,
            defaultTheme: 'dark',
            enableSystem: true,
            themes: ['light', 'dark'],
          }}
        >
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
