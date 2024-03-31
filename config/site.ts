import { ReactNode } from "react";
import { TAvailLocale } from ".";
import { TreeSectionProps } from "@/components/client-only/tree-section";

export type SiteConfig = typeof siteConfig;
export const APP_DOMAIN = "https://www.peachhub.love";
type LangLabel = { [k in TAvailLocale]: string };
interface TLink {
  id: string;
  label: LangLabel;
  href: string;
  external?: boolean; // default false
  showNaveDesktopMenu?: boolean; // default false
  showNaveMobileMenu?: boolean; // default false
  icon: ReactNode;
}

const links = Object.freeze<TLink[]>([
  // internal links
  {
    id: "home",
    label: {
      en: "Home",
      ko: "홈",
    },
    href: "/",
    icon: "🏠",
  },
  {
    id: "docs",
    label: {
      en: "Docs",
      ko: "문서",
    },
    href: "/docs",
    icon: "📚",
  },
  {
    id: "about",
    label: {
      en: "About",
      ko: "소개",
    },
    href: "/about",
    icon: "👋",
  },
  {
    id: "projects",
    label: {
      en: "Projects",
      ko: "프로젝트",
    },
    href: "/project",
    icon: "🚀",
  },
  {
    id: "game",
    label: {
      en: "Game",
      ko: "게임",
    },
    href: "/game",
    icon: "🎮",
  },
  // external links
  {
    id: "github",
    label: {
      en: "GitHub",
      ko: "깃허브",
    },
    href: "https://github.com/seongpil0948",
    icon: "🐙",
    external: true,
  },
  {
    id: "linkedin",
    label: {
      en: "LinkedIn",
      ko: "링크드인",
    },
    href: "https://www.linkedin.com/in/choi-seongpil-9910a0203",
    icon: "🔗",
    external: true,
  },
]);

const LINUX_DEFAULT_PATH = `/docs/linux/essential-commands`;
export const redirectUris = Object.freeze({
  docs: LINUX_DEFAULT_PATH,
  linux: LINUX_DEFAULT_PATH,
});

export const siteConfig = Object.freeze({
  name: "SP Log",
  short_name: "SP Blog",
  description: "seongpil's blog",
  links,
  sitemap: APP_DOMAIN + "/sitemap.xml",
  start_url: "/",
  display: "standalone",
  icons: {
    icon: "/favicon.ico",
    shortcut: "favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
});

export const reduceChildLinks = (tree: TreeSectionProps): string[] => {
  // return child links
  if (!tree || !tree.href) return [];
  if (!tree.children) return [tree.href];

  return tree.children.reduce((acc, link) => {
    if (link.children) {
      acc.push(...reduceChildLinks(link));
    }
    acc.push(link.href);
    return acc;
  }, [] as string[]);
};
