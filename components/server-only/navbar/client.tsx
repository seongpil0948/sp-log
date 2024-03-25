"use client";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import { SearchIcon } from "@/components/server-only/icons";
import { TAvailLocale } from "@/config";
import { typo } from "@/components/server-only/primitives";
import { usePathname } from "next/navigation";
import { TreeSectionProps } from "../../client-only/tree-section";
import { IGetTreeArgs } from "@/app/_utils/server/dir-tree";
import { NavbarSlots, SlotsToClasses } from "@nextui-org/theme";
import { CommonDrawerProps } from "../../client-only/drawer";

export interface CommonNavbarProps {
  tree?: TreeSectionProps;
  children?: React.ReactNode;

  leftTreeOptions: IGetTreeArgs;
  treeLeft?: TreeSectionProps;
  prefix?: React.ReactNode;
  classes?: SlotsToClasses<NavbarSlots>;
  drawerProps?: Omit<CommonDrawerProps, "children">;
}
export function NavInput() {
  return (
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
}
export const NavMobileMenu = (props: { locale: TAvailLocale }) => {
  const pathName = usePathname();
  return (
    <NavbarMenu>
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
  );
};

export default NavMobileMenu;
