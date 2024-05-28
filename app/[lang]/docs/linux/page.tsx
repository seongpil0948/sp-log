import commonConfig from '@/config'
import { redirectUris } from '@/config/site'

import { redirect } from 'next/navigation'

import type { TAvailLocale } from '@/config'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(redirectUris.linux)
}
