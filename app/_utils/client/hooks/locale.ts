import { useCommonCtx } from '@/app/_providers/common'
import { useEffect, useState } from 'react'

import type { TDictVal } from '@/app/[lang]/dictionaries'

export function useDictionary() {
  const [dictionary, setDictionary] = useState<TDictVal | undefined>()
  const {clientLocale} = useCommonCtx()

  useEffect(() => {
    import(`@/locales/${clientLocale}.json`).then((module: {
      default: TDictVal
    }) => {
      setDictionary(module.default)
    }).catch(err => {
      console.error(`Error loading dictionary: ${err}`)
    })
  })

  return dictionary
}
