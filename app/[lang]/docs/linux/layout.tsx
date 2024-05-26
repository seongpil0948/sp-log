import {siteConfig} from '@/config/site'

import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: {
    default: `Linux`,
    template: `%s - Linux - ${siteConfig.name}`,
  },
  description: 'Linux Documentation',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  // const tree = getTree('app/[lang]/doc/linux', { extensions: /\.mdx$/ })
  return <>{children}</>
}
