import { Metadata, ResolvingMetadata } from 'next'
import Content from './content.mdx'

import commonConfig, { TAvailLocale } from '@/config'
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}

export async function generateMetadata(
  { params: { lang } }: Param,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Monorepo management - Nx',
    description: 'How to manage a monorepo with nx.',
  }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
