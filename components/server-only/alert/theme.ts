import clsx from "clsx";
import { tv } from "tailwind-variants";
import { paragraph, subtitle } from "../primitives";
import { error } from "console";

export const alertTheme = tv({
  base: "",
  slots: {
    wrapper: "w-full flex p-2 md:p-4",
    icon: "ml-2 mt-2",
    textWrapper: "flex flex-col gap-2 pl-4",
    title: clsx(
      "text-start",
      subtitle({
        weight: "bold",
        color: "content",
      })
    ),
    content: clsx(
      paragraph({
        color: "content",
        font: "gothic",
        size: "sm",
      })
    ),
  },
  variants: {
    color: {
      default: {
        wrapper: "bg-default-100",
      },
      info: {
        wrapper: "bg-primary-100",
      },
      warn: {
        wrapper: "bg-warning-100",
      },
      error: {
        wrapper: "bg-danger-100",
      },
    },
  },
});
export default alertTheme;
