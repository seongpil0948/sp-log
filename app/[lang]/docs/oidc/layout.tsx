import {siteConfig} from '@/config/site'
import {main} from '@/config/variants/primitives'

import type {Metadata} from 'next'

export const metadata: Metadata = {
  description: 'Interactive Documentation',
  title: {
    default: `Js Interactive`,
    template: `%s - ${siteConfig.name}`,
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  // const tree = getTree('app/[lang]/doc/interactive', { extensions: /\.mdx$/,})
  return <>{children}</>
}
