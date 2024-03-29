import { CommonNavbarProps, NavInput, NavMobileMenu } from "./client";
import { clsx, type ClassValue } from "clsx";
import { navbar } from "./theme";
import { getTree } from "@/app/_utils/server/dir-tree";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/server-only/icons";
import { Logo } from "@/components/server-only/icons";
import { PrefixComp } from "./side";
import { getDictionary } from "@/app/[lang]/dictionaries";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export default async function CommonNavbar(p: CommonNavbarProps) {
  const { tree, leftTreeOptions } = p;
  const { base, content, brand, item } = navbar();

  const treeTop = tree ?? getTree({ dir: "app/[lang]", options: { depth: 3 } });
  const treeLeft = getTree(leftTreeOptions);

  const extendedClassNames = {
    base: cn(base(), p.classes?.base),
    content: cn(content(), p.classes?.content),
    brand: cn(brand(), p.classes?.brand),
    item: cn(item(), p.classes?.item),
  } as CommonNavbarProps["classes"];

  const drawerProps = {
    sheetProps: {
      isDismissable: true,
      isKeyboardDismissDisabled: true,
      shouldBlockScroll: false,
    },
    ...p.drawerProps,
  };
  const props = {
    ...p,
    classes: extendedClassNames,
    tree: treeTop,
    treeLeft: treeLeft,
    drawerProps: drawerProps,
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <PrefixComp {...props} />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">SP World</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex basis-3/5 grow">
          <NavInput />
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
  );
}
