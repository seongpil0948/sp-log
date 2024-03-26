import {
  fontMono,
  fontNanumGothic,
  fontNanumPenScript,
  fontRoboto,
  fontSans,
} from "@/config/fonts";
import clsx from "clsx";
import { tv } from "tailwind-variants";
import { link as linkStyles } from "@nextui-org/theme";

const fontModule = {
  mono: fontMono.className,
  sans: fontSans.className,
  roboto: fontRoboto.className,
  gothic: fontNanumGothic.className,
  script: fontNanumPenScript.className,
};
const colorModule = {
  violet: "from-[#FF1CF7] to-[#b249f8]",
  yellow: "from-[#FF705B] to-[#FFB457]",
  blue: "from-[#5EA2EF] to-[#0072F5]",
  cyan: "from-[#00b7fa] to-[#01cfea]",
  green: "from-[#6FEE8D] to-[#17c964]",
  pink: "from-[#FF72E1] to-[#F54C7A]",
  foreground:
    "dark:from-[#FFFFFF] dark:to-[#4B4B4B] from-[#4B4B4B] to-[#FFFFFF]",
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  default: "text-default",
  danger: "text-danger",
};
export const title = tv({
  base: "tracking-tight inline font-semibold mt-3 mb-7 leading-tight",
  variants: {
    color: colorModule,
    size: {
      xs: "text-2xl lg:text-3xl",
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9 ",
      lg: "text-4xl lg:text-6xl bold underline underline-offset-8",
    },
    fullWidth: {
      true: "w-full block",
    },
    font: fontModule,
  },
  defaultVariants: {
    size: "md",
    font: "mono",
    fullWidth: true,
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
    font: fontModule,
  },
  defaultVariants: {
    fullWidth: true,
    font: "mono",
  },
});

const commonTxt = {
  size: {
    sm: "text-xs sm:text-sm md:text-base lg:text-lg my-2",
    md: "text-sm sm:text-md md:text-lg lg:text-xl my-4",
    lg: "text-md sm:text-lg md:text-xl lg:text-2xl my-6",
  },
  font: fontModule,
  color: colorModule,
  inline: {
    true: "inline-block h-fit",
  },
  weight: {
    normal: "font-normal",
    bold: "font-bold",
  },
};
export const paragraph = tv({
  base: " font-normal leading-7 ",
  variants: {
    ...commonTxt,
  },
  defaultVariants: {
    size: "md",
    font: "sans",
  },
});
export const typo = tv({
  base: "p-1 font-normal leading-7 ",
  variants: {
    type: {
      normal: "font-normal",
      bold: "font-bold",
      italic: "italic",
      link: clsx(
        linkStyles({ color: "foreground" }),
        "data-[active=true]:text-primary data-[active=true]:font-medium"
      ),
    },
    ...commonTxt,
  },
  defaultVariants: {
    size: "md",
    font: "sans",
  },
});

export const main = tv({
  base: "flex-grow py-2 px-8 relative flex flex-col min-h-screen",
  variants: {
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
    },
    size: {
      sm: "px-8 pt-6 pb-8",
      md: "md:py-10",
      lg: "px-4 py-10",
    },
  },
});
