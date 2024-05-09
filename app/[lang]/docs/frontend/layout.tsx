import { Metadata } from 'next'
import { siteConfig } from '@/config/site'
import { main } from '@/config/variants/primitives'

export const metadata: Metadata = {
  description: 'Abacus NextFramework Documentation',
  title: {
    default: `Abacus Next Framework`,
    template: `%s - ${siteConfig.name}`,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const tree = getTree('app/[lang]/doc/framework-next', { extensions: /\.mdx$/ })
  return <>{children}</>
}
