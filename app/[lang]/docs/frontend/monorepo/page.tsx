import commonConfig from '@/config'

import Content from './content.mdx'

import type {Metadata} from 'next'


export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Monorepo management - Nx',
    description: 'How to manage a monorepo with nx.',
  }
}

export default async function SSGPage() {
  return (
    <div>
      <Content />
    </div>
  )
}
