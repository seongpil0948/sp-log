// refer https://www.apple.com/kr/airpods-pro/
import config from '@/config'

import { getDictionary } from '../dictionaries'

import { Scene } from './_components/Scene'

import type { TAvailLocale } from '@/config'

export async function generateStaticParams() {
  return config.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  const dict = await getDictionary(lang)

  return (
    <div data-theme="dark">
      <Scene />
    </div>
  )
}
