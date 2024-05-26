import {siteConfig} from '@/config/site'
import type {ReactNode} from 'react'

import type {Metadata} from 'next'
export const metadata: Metadata = {
  description: 'Interactive Documentation',
  title: {
    default: `Js Interactive`,
    template: `%s - ${siteConfig.name}`,
  },
}

export default function RootLayout({children}: {children: ReactNode}) {
  // const tree = getTree('app/[lang]/doc/interactive', { extensions: /\.mdx$/,})
  return <>{children}</>
}
