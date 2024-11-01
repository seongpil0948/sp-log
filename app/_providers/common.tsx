// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import config from '@/config'
import { createContext, useContext, useEffect, useState } from 'react'

import { usePathname } from 'next/navigation'

import { ContextUndefined } from '../_utils/common'

import type { TAvailLocale } from '@/config'

type CommonContextType = {
  clientLocale: TAvailLocale
  setClientLocale: (locale: TAvailLocale) => void
}
export const CommonContext = createContext<CommonContextType | undefined>(undefined)

export default function CommonProvider({children}: {children: React.ReactNode}) {
  const {i18n} = config
  const isAvailableLocale = i18n.isAvailableLocale
  const [clientLocale, setClientLocale] = useState<TAvailLocale>(i18n.defaultLocale)
  const pathname = usePathname()

  useEffect(() => {
    const pattern = /\/(en|ko)\//
    const match = pathname.match(pattern)
    if (match) {
      const locale = match[1]
      if (locale !== clientLocale && isAvailableLocale(locale)) setClientLocale(locale)
    }
  }, [clientLocale, pathname])

  return (
    <CommonContext.Provider
      value={{
        clientLocale,
        setClientLocale,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useCommonCtx = () => {
  const ctx = useContext(CommonContext)
  if (ctx === undefined) {
    throw new ContextUndefined('CommonContext')
  }
  return ctx
}
