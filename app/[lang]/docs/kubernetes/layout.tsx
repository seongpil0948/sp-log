import {siteConfig} from '@/config/site'
import {main} from '@/config/variants/primitives'
import type {ReactNode} from 'react'

import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: {
    default: `Documentation`,
    template: `%s - kubernetes - ${siteConfig.name}`,
  },
  description: 'fucking k8s',
}

export default function RootLayout({children}: {children: ReactNode}) {
  // const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  return <>{children}</>
}
