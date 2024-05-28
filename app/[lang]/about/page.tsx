import {getOnlyFiles} from '@/app/_utils/server/dir-tree'
import {AbsoluteFooter} from '@/components/server-only/footers'
import commonConfig from '@/config'


import clsx from 'clsx'

import About from './_components/About'
import AboutSectionEn from './_components/AboutSectionEn'
import AboutSectionKo from './_components/AboutSectionKo'
import styles from './styles.module.css'

import type {TAvailLocale} from '@/config'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  const certificates = getOnlyFiles('public/cert', {extensions: /\.png$/})
  const certData = [...certificates]
  return (
    <div id="about-root" className={clsx(styles.about)}>
      {lang === 'ko' ? <AboutSectionKo certData={certData} /> : <AboutSectionEn certData={certData} />}
      <AbsoluteFooter disableDarkMode goHome disableText />
      <About rootSelector="#about-root" />
    </div>
  )
}
