import {getDictionary} from '@/app/[lang]/dictionaries'
import {getTree} from '@/app/_utils/server/dir-tree'
import {GithubIcon} from '@/components/server-only/icons'
import {Logo} from '@/components/server-only/icons'
import {ThemeSwitch} from '@/components/theme-switch'

import {Link} from '@nextui-org/link'
import {Navbar as NextUINavbar, NavbarContent, NavbarMenuToggle, NavbarBrand, NavbarItem} from '@nextui-org/navbar'
import {clsx, type ClassValue} from 'clsx'
import NextLink from 'next/link'

import SearchModal from '../../client-only/button/SearchModal'

import {NavMobileMenu} from './client'
import type {CommonNavbarProps} from './client'
import {PrefixComp} from './side'
import {navbar} from './theme'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export default function CommonNavbar(p: CommonNavbarProps) {
  const {tree, leftTreeOptions} = p
  const {base, content, brand, item} = navbar()

  const treeTop = tree ?? getTree({dir: 'app/[lang]', options: {depth: 3}})
  const treeLeft = getTree(leftTreeOptions)

  const extendedClassNames = {
    base: cn(base(), p.classes?.base),
    content: cn(content(), p.classes?.content),
    brand: cn(brand(), p.classes?.brand),
    item: cn(item(), p.classes?.item),
  } as CommonNavbarProps['classes']

  const drawerProps = {
    sheetProps: {
      isDismissable: true,
      isKeyboardDismissDisabled: true,
      shouldBlockScroll: false,
    },
    ...p.drawerProps,
  }
  const props = {
    ...p,
    classes: extendedClassNames,
    tree: treeTop,
    treeLeft: treeLeft,
    drawerProps: drawerProps,
  }

  return (
    <NextUINavbar maxWidth="full" shouldHideOnScroll>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <PrefixComp {...props} />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SP World</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex basis-2/5">
          <SearchModal locale={p.lang ?? 'en'} />
        </NavbarItem>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal aria-label="Github">
          <GithubIcon className="text-danger" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavMobileMenu />
    </NextUINavbar>
  )
}
