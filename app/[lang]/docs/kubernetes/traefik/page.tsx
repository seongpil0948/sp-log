import {getDictionary} from '@/app/[lang]/dictionaries'
import commonConfig from '@/config'

import Content from './content.mdx'

import type {TAvailLocale} from '@/config'
import type {ResolvingMetadata, Metadata} from 'next'


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
    title: 'Traefik',
    description: 'Reverse proxy and load balancer for HTTP on a Traefik',
  }
}

export default async function SSGPage({params: {lang}}: Props) {
  return (
    <div>
      <Content />
    </div>
  )
}
