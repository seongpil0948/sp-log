import { ReactNode } from "react";
import { TAvailLocale } from ".";

export type SiteConfig = typeof siteConfig;

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
    href: "/projects",
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
  },
  {
    id: "linkedin",
    label: {
      en: "LinkedIn",
      ko: "링크드인",
    },
    href: "https://www.linkedin.com/in/choi-seongpil-9910a0203",
    icon: "🔗",
  },
]);

export const siteConfig = {
  name: "SP-LOG",
  description: "seongpil's blog",
  links,
};
