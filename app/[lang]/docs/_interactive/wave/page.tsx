import commonConfig from '@/config'

import {WaveView} from './_components/client-only/WaveView'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

import type {TAvailLocale} from '@/config'
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return (
    <div id="#" className="height-auto flex-center-col relative box-border min-h-screen bg-content1 text-foreground ">
      page
      <WaveView />
    </div>
  )
}
