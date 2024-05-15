export const AVAIL_LOCALES: TAvailLocale[] = ['en', 'ko']
const commonConfig = Object.freeze({
  game: {
    character: {
      default: '/glb/player-basic.glb',
    },
  },
  system: {
    breakpoints: {
      mobile: 0,
      tablet: 768,
      desktop: 1280,
    },
    landingPath: '/home',
  },
  i18n: {
    defaultLocale: 'ko' as TAvailLocale,
    locales: AVAIL_LOCALES,
    isAvailableLocale: (locale: string): locale is TAvailLocale => AVAIL_LOCALES.includes(locale as TAvailLocale),
  },
})
export type TAvailLocale = 'en' | 'ko'
export default commonConfig
