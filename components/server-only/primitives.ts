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
  default: "text-black dark:text-white",
  danger: "text-danger",
  black: "text-black",
  white: "text-white",
  gray: "text-gray-300 dark:text-gray-700",
  content: " text-[#333639]",
};
export const title = tv({
  base: "tracking-tight inline font-semibold leading-tight",
  variants: {
    color: colorModule,
    size: {
      xs: " text-xl md:text-2xl lg:text-3xl",
      sm: "text:2xl md:text-3xl lg:text-4xl",
      md: "text:3xl md:text-[2.3rem] lg:text-5xl leading-9 ",
      lg: "text:4xl md:text-5xl lg:text-6xl bold underline underline-offset-8",
    },
    fullWidth: {
      true: "w-full block",
    },
    margin: {
      true: "mt-8 md:mt-16 mb-5 md:mb-7",
    },
    font: fontModule,
  },
  defaultVariants: {
    size: "md",
    font: "mono",
    fullWidth: true,
    margin: true,
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
  base: "text-black dark:text-white w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
    weight: {
      bold: "font-bold",
      italic: "italic",
    },
    font: fontModule,
    color: colorModule,
  },
  defaultVariants: {
    size: "md",
    font: "gothic",
    color: "black",
    fullWidth: true,
  },
});

const commonTxt = {
  size: {
    xs: "text-xxs sm:text-xs md:text-sm lg:text-base my-1",
    sm: "text-xs sm:text-sm md:text-base lg:text-lg my-1 md:my-2",
    md: "text-sm sm:text-md md:text-lg lg:text-xl my-2 md:my-4",
    lg: "text-md sm:text-lg md:text-xl lg:text-2xl my-3 md:my-6",
    xl: "text-lg sm:text-xl md:text-2xl lg:text-3xl my-4 md:my-8",
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
  base: " font-normal leading-7 text-black dark:text-white",
  variants: {
    ...commonTxt,
    block: {
      true: "block",
      false: "contents",
    },
  },
  defaultVariants: {
    size: "md",
    font: "gothic",
    color: "black",
    block: false,
  },
});
export const typo = tv({
  base: "p-1 font-normal leading-1 md:leading-7  text-black dark:text-white ",
  variants: {
    type: {
      normal: "font-normal",
      bold: "font-bold",
      italic: "italic",
      link: clsx(
        linkStyles({ color: "foreground", size: "sm" }),
        "data-[active=true]:text-primary data-[active=true]:font-medium"
      ),
    },
    ...commonTxt,
  },
  defaultVariants: {
    size: "md",
    font: "gothic",
    color: "black",
  },
});

export const main = tv({
  base: "flex-grow px-2 md:py-2 md:px-4 lg:px-8 relative flex flex-col min-h-screen",
  variants: {
    justify: {
      center: "justify-center",
      start: "justify-start",
      end: "justify-end",
    },
    size: {
      sm: "lg:px-8 md:pt-4 lg:pt-6  md:pb-4 lg:pb-8",
      md: "lg:py-10",
      lg: "lg:px-4 lg:py-10",
    },
  },
  defaultVariants: {
    size: "md",
    font: "gothic",
    color: "black",
  },
});

export const listText = tv({
  base: clsx(typo(), "text-black dark:text-white [&::marker]:font-semibold"),
  variants: {
    ...commonTxt,
  },
  defaultVariants: {
    size: "md",
    font: "gothic",
    color: "black",
  },
});
