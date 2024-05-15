import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'
import 'server-only'

const dictionaries = Object.freeze({
  en: () => import('@/locales/en.json').then(module => module.default),
  ko: () => import('@/locales/ko.json').then(module => module.default),
})

// auth/invalid-login-credentials
export const getDictionary = async (locale: TAvailLocale) => {
  return dictionaries[
    (commonConfig.i18n.isAvailableLocale(locale) ? locale : commonConfig.i18n.defaultLocale) as keyof TDict
  ]()
}

export type TDict = typeof dictionaries
export type TLocale = keyof TDict
export type TDictVal = TDict[TLocale] extends () => Promise<infer R> ? R : never
