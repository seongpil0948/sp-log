"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, SearchIcon } from "@/components/server-only/icons";
import { Logo } from "@/components/server-only/icons";
import { TAvailLocale } from "@/config";
import { typo } from "./server-only/primitives";
import { usePathname } from "next/navigation";

export const Navbar = (props: { locale: TAvailLocale }) => {
  const pathName = usePathname();
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
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
          {/* <Link isExternal href={siteConfig.links.github} aria-label="Github"> */}
          <Link isExternal aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex basis-3/5 grow">
          {searchInput}
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

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.links.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className={typo({
                  type: "link",
                  color: pathName.includes(item.href)
                    ? "primary"
                    : item.external
                    ? "danger"
                    : "foreground",
                })}
                // color="foreground"
                href={item.href}
                size="lg"
              >
                {item.label[props.locale]}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
