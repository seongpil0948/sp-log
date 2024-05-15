import {getDictionary} from '@/app/[lang]/dictionaries'
import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'

import Bridge from './_components/client-only/Bridge'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  const dict = await getDictionary(lang)
  return (
    <div
      style={{
        overflow: 'hidden',
        margin: '0',
      }}
    >
      <Bridge />
    </div>
  )
}
