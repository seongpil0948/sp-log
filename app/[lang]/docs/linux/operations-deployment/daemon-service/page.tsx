import commonConfig from '@/config'

import Content from './content.mdx'

import type {TAvailLocale} from '@/config'
import type {ResolvingMetadata, Metadata} from 'next'


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
    title: 'Daemon & Service',
    description: 'Daemon & Service with Linux',
  }
}

export default async function SSGPage({params: {lang}}: Props) {
  return (
    <div>
      <Content />
    </div>
  )
}
