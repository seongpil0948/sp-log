import commonConfig from '@/config'

import Content from './content.mdx'

import type {TAvailLocale} from '@/config'


export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}
interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
