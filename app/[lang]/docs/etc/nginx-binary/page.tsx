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
    title: 'Nginx binary 설치',
    description: 'Nginx 설치의 정석.',
  }
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
