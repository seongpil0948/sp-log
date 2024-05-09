import 'server-only'
import config, { TAvailLocale } from '@/config'
import Negotiator from 'negotiator'
import { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import { extractFromPath } from '../common/locale'
import SERVER_CONFIG from '@/app/api/config'

export function getLocaleRequest(request: NextRequest): TAvailLocale {
  // if cookie exists, use it
  const cookieLocale = request.cookies.get(
    SERVER_CONFIG.cookie.keyLocale,
  )?.value
  if (cookieLocale && config.i18n.isAvailableLocale(cookieLocale))
    return cookieLocale as TAvailLocale

  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore locales are readonly
  const locales = config.i18n.locales
  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales,
  )

  const locale = matchLocale(languages, locales, config.i18n.defaultLocale)
  return locale as TAvailLocale
}

export function getLocaleBrowser() {
  const userLangs = [...navigator.languages, navigator.language]
  const locale = matchLocale(
    userLangs,
    config.i18n.locales,
    config.i18n.defaultLocale,
  )
  return locale as TAvailLocale
}

export function matchLocalePath(pathname: string): TAvailLocale {
  const pattern = /\/(en|ko)\//
  const match = pathname.match(pattern)
  if (match) {
    const locale = match[1]
    if (config.i18n.isAvailableLocale(locale)) return locale
  }
  return config.i18n.defaultLocale
}

export function matchLocaleStr(input: string): TAvailLocale {
  for (let i = 0; i < config.i18n.locales.length; i++) {
    const locale = config.i18n.locales[i]
    if (input.includes(locale)) return locale
  }
  return config.i18n.defaultLocale
}

export async function splitLocaleAndPath(path: string) {
  'use server'
  return Promise.resolve(extractFromPath(path))
}
