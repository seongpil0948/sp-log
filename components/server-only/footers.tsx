import {Link} from '@nextui-org/link'

import {paragraph, typo} from '../../config/variants/primitives'
import SelectorNational from '../client-only/selector/National'
import {ThemeSwitch} from '../theme-switch'

import {Logo} from './icons'

const LogoLink = (props?: {href?: string; disableText?: boolean}) => (
  <Link
    color="foreground"
    href={props?.href ?? 'https://github.com/seongpil0948'}
    isExternal
    className="flex items-center"
  >
    <Logo />
    {!props?.disableText && <p className={typo({size: 'sm', color: 'foreground'})}>Sp Blog</p>}
  </Link>
)

export const CmFooter = () => {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <LogoLink />
          <div className="mb-6 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mb-0">
            <span className="block text-sm text-gray-500 dark:text-gray-400 sm:text-center">
              © 2024 . All Rights Reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function AbsoluteFooter(props?: {
  goHome?: boolean
  disableDarkMode?: boolean
  disableI18n?: boolean
  disableText?: boolean
}) {
  const goHome = props?.goHome ?? false
  return (
    <footer
      className="absolute bottom-0 w-full"
      style={{
        zIndex: 2,
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl p-2 md:py-4">
        <div className="flex items-center justify-between">
          <LogoLink href={props?.goHome ? '/home' : undefined} disableText={props?.disableText} />
          <div className="flex flex-wrap items-center sm:mb-0 gap-2">
            {!props?.disableDarkMode && <ThemeSwitch />}
            {!props?.disableI18n && <SelectorNational />}
          </div>
        </div>
      </div>
    </footer>
  )
}
