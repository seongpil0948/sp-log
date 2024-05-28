import {siteConfig} from '@/config/site'

import type {Metadata} from 'next'
import type {ReactNode} from 'react'

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
