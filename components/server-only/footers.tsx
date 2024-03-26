import { Link } from "@nextui-org/link";
import { Logo } from "./icons";

export const CmFooter = () => {
  return (
    <footer className="mt-auto">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            color="foreground"
            href="https://github.com/seongpil0948"
            isExternal
            className="mb-4 flex items-center sm:mb-0"
          >
            <Logo />
            <p className="font-bold">Sp Blog</p>
          </Link>
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
