export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

import commonConfig from '@/config'

import {redirect} from 'next/navigation'

import type {TAvailLocale} from '@/config'

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(`/${lang}/doc/kubernetes/on-premise-1`)
}
