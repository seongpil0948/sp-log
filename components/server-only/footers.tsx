import { Link } from "@nextui-org/link";
import { Logo } from "./icons";
import { ThemeSwitch } from "../theme-switch";

const LogoLink = () => (
  <Link
    color="foreground"
    href="https://github.com/seongpil0948"
    isExternal
    className="mb-4 flex items-center sm:mb-0"
  >
    <Logo />
    <p className="font-bold">Sp Blog</p>
  </Link>
);

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
  );
};

export function AbsoluteFooter() {
  return (
    <footer className="absolute bottom-0 w-full">
      <div className="mx-auto w-full max-w-screen-xl p-2 md:py-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <LogoLink />
          <div className="flex flex-wrap items-center sm:mb-0">
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
