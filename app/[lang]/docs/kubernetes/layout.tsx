import {siteConfig} from '@/config/site'

import type {Metadata} from 'next'
import type {ReactNode} from 'react'


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
