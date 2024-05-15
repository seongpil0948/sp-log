import {getDictionary} from '@/app/[lang]/dictionaries'
import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'
import {redirectUris} from '@/config/site'

import {redirect} from 'next/navigation'

import Content from './content.mdx'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  const dict = await getDictionary(lang)
  return redirect(redirectUris.docs)
}
