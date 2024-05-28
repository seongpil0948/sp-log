import commonConfig from '@/config'

import {redirect} from 'next/navigation'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

import type {TAvailLocale} from '@/config'
import {redirectUris} from '@/config/site'
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(redirectUris.linux)
}
