"use client";

import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import commonConfig from "@/config";
import { typo } from "@/components/server-only/primitives";
import { usePathname, useRouter } from "next/navigation";
import { TreeSectionProps } from "../../client-only/tree-section";
import { IGetTreeArgs } from "@/app/_utils/server/dir-tree";
import { NavbarSlots, SlotsToClasses } from "@nextui-org/theme";
import { CommonDrawerProps } from "../../client-only/drawer";
import { extractFromPath } from "@/app/_utils/common/locale";
import { DocSearch } from "@docsearch/react";

import "@docsearch/css";

export interface CommonNavbarProps {
  tree?: TreeSectionProps;
  children?: React.ReactNode;

  leftTreeOptions: IGetTreeArgs;
  treeLeft?: TreeSectionProps;
  prefix?: React.ReactNode;
  classes?: SlotsToClasses<NavbarSlots>;
  drawerProps?: Omit<CommonDrawerProps, "children">;
}

export const NavMobileMenu = () => {
  const pathName = usePathname();
  let { locale } = extractFromPath(pathName);
  if (!locale) locale = commonConfig.i18n.defaultLocale;
  return (
    <NavbarMenu className="m-0 p-0">
      <div className="flex flex-col gap-2">
        {siteConfig.links.map((item, index) => (
          <NavbarMenuItem
            key={`${item}-${index}`}
            className="px-8 mt-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Link
              className={typo({
                type: "link",
                size: "lg",
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
              {item.label[locale]}
            </Link>
          </NavbarMenuItem>
        ))}
      </div>
    </NavbarMenu>
  );
};

export default NavMobileMenu;
