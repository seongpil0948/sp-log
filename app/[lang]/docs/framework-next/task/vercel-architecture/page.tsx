/* eslint-disable no-unused-vars */
import { TAvailLocale } from '@/config'
import Content from './content.mdx'

import commonConfig from '@/config'
import type { Metadata, ResolvingMetadata } from 'next/types'

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
    title: 'Vercel 아키텍처',
    description: 'Vercel 아키텍처',
  }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
