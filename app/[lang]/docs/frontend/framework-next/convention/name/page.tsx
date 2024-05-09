import Content from './content.mdx'

import commonConfig, { TAvailLocale } from '@/config'
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({ lang }))
}

interface Param {
  params: { lang: TAvailLocale }
}
// eslint-disable-next-line no-unused-vars
export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  )
}
