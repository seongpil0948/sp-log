import config from '@/config'

export async function generateStaticParams() {
  return config.i18n.locales.map(lang => ({lang}))
}

export default function Layout({children}: {children: React.ReactNode}) {
  return <>{children}</>
}
