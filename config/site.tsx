import { FC, ReactNode } from 'react'
import { TAvailLocale } from '.'
import { TreeSectionProps } from '@/components/client-only/tree-section'
import { GithubIcon, LinkedInIcon } from '@/components/server-only/icons'
import { IconSvgProps } from '@/types'

export type SiteConfig = typeof siteConfig
export const APP_DOMAIN = 'https://www.peachhub.love'
export const CODING_GAME =
  'https://www.codingame.com/profile/f98c28095b66d60aa9adc3f62e04210e6669263'
type LangLabel = { [k in TAvailLocale]: string }
interface TLink {
  id: string
  label: LangLabel
  href: string
  external?: boolean // default false
  showNaveDesktopMenu?: boolean // default false
  showNaveMobileMenu?: boolean // default false
  icon: ReactNode
}
export const LINKS_MAP = Object.freeze({
  home: {
    id: 'home',
    label: {
      en: 'Home',
      ko: '홈',
    },
    href: APP_DOMAIN,
    icon: 'To 🏠',
  },
  docs: {
    id: 'docs',
    label: {
      en: 'Docs',
      ko: '문서',
    },
    href: '/docs',
    icon: '📚',
  },
  about: {
    id: 'about',
    label: {
      en: 'About',
      ko: '소개',
    },
    href: '/about',
    icon: '👋',
  },
  projects: {
    id: 'projects',
    label: {
      en: 'Projects',
      ko: '프로젝트',
    },
    href: '/project',
    icon: '🚀',
  },
  game: {
    id: 'game',
    label: {
      en: 'Game',
      ko: '게임',
    },
    href: '/game',
    icon: '🎮',
  },
  github: {
    id: 'github',
    label: {
      en: 'GitHub',
      ko: '깃허브',
    },
    href: 'https://github.com/seongpil0948',
    icon: <GithubIcon />,
    external: true,
  },
  linkedIn: {
    id: 'linkedin',
    label: {
      en: 'LinkedIn',
      ko: '링크드인',
    },
    href: 'https://www.linkedin.com/in/choi-seongpil-9910a0203',
    icon: <LinkedInIcon />,
    external: true,
  },
  codingGame: {
    id: 'coding-game',
    label: {
      en: 'Coding Game',
      ko: '코딩 게임',
    },
    href: CODING_GAME,
    icon: '🎲',
    external: true,
  },
  stock: {
    id: 'stock',
    label: {
      en: 'Stock',
      ko: '주식',
    },
    href: 'https://stock.peachhub.love',
    icon: '💹',
    external: true,
  },
  credly: {
    id: 'credly',
    label: {
      en: 'Credly',
      ko: 'Credly',
    },
    href: 'https://www.credly.com/users/seongpill-choi/badges',
    icon: '👨🏼‍🎓',
    external: true,
  },
})

const links = Object.freeze<TLink[]>(Object.values(LINKS_MAP))

const LINUX_DEFAULT_PATH = `/docs/linux/essential-commands`
export const redirectUris = Object.freeze({
  docs: LINUX_DEFAULT_PATH,
  linux: LINUX_DEFAULT_PATH,
})

export const siteConfig = Object.freeze({
  name: 'SP Log',
  short_name: 'SP Blog',
  description: "seongpil's blog",
  links,
  sitemap: APP_DOMAIN + '/sitemap.xml',
  start_url: '/',
  display: 'standalone',
  icons: {
    icon: '/favicon.ico',
    shortcut: 'favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
})

export const reduceChildLinks = (tree: TreeSectionProps): string[] => {
  // return child links
  if (!tree || !tree.href) return []
  if (!tree.children) return [tree.href]

  return tree.children.reduce((acc, link) => {
    if (link.children) {
      acc.push(...reduceChildLinks(link))
    }
    acc.push(link.href)
    return acc
  }, [] as string[])
}
