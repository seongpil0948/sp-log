/* eslint-disable no-unused-vars */
import Content from './content.mdx'

import commonConfig from '@/config'
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({ lang }))
}

import { TAvailLocale } from '@/config'
import { Metadata, ResolvingMetadata } from 'next/types'
interface Param {
  params: { lang: TAvailLocale }
}

export async function generateMetadata(
  { params: { lang } }: Param,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'CDN',
    description: 'CDN에 대하여',
  }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
