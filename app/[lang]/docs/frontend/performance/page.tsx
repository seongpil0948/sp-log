import commonConfig from '@/config'

import Content from './content.mdx'

import type {TAvailLocale} from '@/config'
import type {Metadata, ResolvingMetadata} from 'next'


export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export async function generateMetadata({params: {lang}}: Param, parent: ResolvingMetadata): Promise<Metadata> {
  return {
    title: 'Web Performance',
    description: 'How to measure web performance.',
  }
}

export default async function SSGPage({params: {lang}}: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
