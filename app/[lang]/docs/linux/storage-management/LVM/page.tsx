import {getDictionary} from '@/app/[lang]/dictionaries'
import {AVAIL_LOCALES} from '@/config'
import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'

import type {ResolvingMetadata, Metadata} from 'next'

import Content from './content.mdx'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

type Props = {
  params: {lang: TAvailLocale}
  searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params: {lang}}: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const dict = await getDictionary(lang)
  return {
    title: "Linux's LVM",
    description: 'logical volume management (LVM) in Linux',
  }
}

export default async function SSGPage({params: {lang}}: Props) {
  return (
    <div>
      <Content />
    </div>
  )
}
