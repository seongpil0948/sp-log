import commonConfig from '@/config'

import {redirect} from 'next/navigation'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

import type {TAvailLocale} from '@/config'
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(`/${lang}/doc/etc/vim`)
}
