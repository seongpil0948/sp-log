'use client'
import type {TAvailLocale} from '@/config'
import {useState} from 'react'

import {Button} from '@nextui-org/button'
import {Popover, PopoverContent, PopoverTrigger} from '@nextui-org/popover'
import {usePathname, useRouter} from 'next/navigation'

type LocaleIcon = '🇺🇸' | '🇰🇷'

function SelectorNational() {
  const path = usePathname()
  console.log('path', path)
  const initialLocale: LocaleIcon = path.includes('/ko') ? '🇰🇷' : '🇺🇸'

  const [selected, setSelected] = useState<LocaleIcon>(initialLocale)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const optionList: LocaleIcon[] = ['🇺🇸', '🇰🇷']

  const handleChanged = (option: LocaleIcon) => {
    const oldLocale = selected && iconToLocale(selected)
    const newLocale = iconToLocale(option)
    if (oldLocale === newLocale) return

    setSelected(option)
    setIsOpen(false)

    fetch(`/api/locale?locale=${newLocale}`)
      .then(res => {
        if (res.ok) {
          let newPath = path
          if (oldLocale) {
            newPath = newPath.replace(oldLocale, newLocale)
          }
          router.replace(newPath)
        }
      })
      .catch(console.error)
  }

  return (
    <Popover showArrow isOpen={isOpen} onOpenChange={open => setIsOpen(open)}>
      <PopoverTrigger>
        <button className=" bg-transparent">{selected}</button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        {optionList.map(option => (
          <Button
            key={option}
            isIconOnly
            className="w-full"
            onClick={() => {
              handleChanged(option)
            }}
            variant="light"
            color={selected === option ? 'primary' : 'default'}
          >
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  )
}

function iconToLocale(icon: LocaleIcon): TAvailLocale {
  return icon === '🇺🇸' ? 'en' : 'ko'
}

export default SelectorNational
export {SelectorNational}
