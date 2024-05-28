'use client'

import {extractFromPath} from '@/app/_utils/common/locale'
import commonConfig from '@/config'
import {siteConfig} from '@/config/site'
import {typo} from '@/config/variants/primitives'


import {Link} from '@nextui-org/link'
import {NavbarMenu, NavbarMenuItem} from '@nextui-org/navbar'
import {usePathname} from 'next/navigation'

import type {CommonDrawerProps} from '../../client-only/drawer'
import type {TreeSectionProps} from '../../client-only/tree-section'
import type {IGetTreeArgs} from '@/app/_utils/server/dir-tree'
import type {TAvailLocale} from '@/config'
import type {NavbarSlots, SlotsToClasses} from '@nextui-org/theme'
import type {ReactNode} from 'react'

export interface CommonNavbarProps {
  tree?: TreeSectionProps
  children?: ReactNode
  lang?: TAvailLocale
  leftTreeOptions: IGetTreeArgs
  treeLeft?: TreeSectionProps
  prefix?: ReactNode
  classes?: SlotsToClasses<NavbarSlots>
  drawerProps?: Omit<CommonDrawerProps, 'children'>
}

export const NavMobileMenu = () => {
  const pathName = usePathname()
  let {locale} = extractFromPath(pathName)
  if (!locale) locale = commonConfig.i18n.defaultLocale
  return (
    <NavbarMenu className="m-0 p-0">
      <div className="flex flex-col gap-2">
        {siteConfig.links.map((item, index) => (
          <NavbarMenuItem
            key={`${item.id}-${index}`}
            className="px-8 mt-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Link
              className={typo({
                type: 'link',
                size: 'lg',
                color: pathName.includes(item.href) ? 'primary' : item.external ? 'danger' : 'foreground',
              })}
              // color="foreground"
              href={item.href}
              size="lg"
            >
              {item.label[locale]}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  )
}

export default NavMobileMenu
