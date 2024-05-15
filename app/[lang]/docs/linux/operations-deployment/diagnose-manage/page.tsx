import {AVAIL_LOCALES} from '@/config'
import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'

import type {ResolvingMetadata, Metadata} from 'next'

import Content from './content.mdx'

// import { getDictionary } from '@/app/[lang]/dictionaries'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

type Props = {
  params: {lang: TAvailLocale}
  searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params: {lang}}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // const dict = await getDictionary(lang)
  return {
    title: 'Diagnose and manage processes',
    description: '프로세스 진단 및 관리',
  }
}

export default async function SSGPage({params: {lang}}: Props) {
  return (
    <div>
      <Content />
    </div>
  )
}
