// refer https://www.apple.com/kr/airpods-pro/
import config from '@/config'
import type {TAvailLocale} from '@/config'

import {ThemeProvider as NextThemesProvider} from 'next-themes'

import {getDictionary} from '../dictionaries'

import {Scene} from './_components/Scene'

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
