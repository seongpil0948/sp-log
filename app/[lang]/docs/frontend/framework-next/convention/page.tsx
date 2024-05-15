import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'

import {redirect} from 'next/navigation'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return redirect(`/${lang}/docs/framework-next/convention/structure`)
}
