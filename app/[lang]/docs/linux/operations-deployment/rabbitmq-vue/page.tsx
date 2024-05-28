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
    title: "Linux's RabbitMQ Vue",
    description: 'Rabbitmq with websocket, vuejs, and more',
  }
}

export default async function SSGPage({params: {lang}}: Props) {
  return (
    <div>
      <Content />
    </div>
  )
}
