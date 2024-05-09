import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { main } from '@/components/server-only/primitives'

export const metadata: Metadata = {
  title: {
    default: `Linux`,
    template: `%s - Linux - ${siteConfig.name}`,
  },
  description: 'Linux Documentation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const tree = getTree('app/[lang]/doc/linux', { extensions: /\.mdx$/ })
  return <>{children}</>
}
