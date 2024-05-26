import config from '@/config'

export function extractFromPath(path: string) {
  const locale = config.i18n.locales.find(l => path.startsWith(`/${l}/`) || path === `/${l}`)
  const p = path
    .split('/')
    .filter(seg => !(config.i18n.locales as string[]).includes(seg))
    .join('/')
  return {locale, path: p}
}
