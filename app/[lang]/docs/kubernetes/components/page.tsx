export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'

import {redirect} from 'next/navigation'
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(`/${lang}/doc/kubernetes/on-premise-1`)
}
