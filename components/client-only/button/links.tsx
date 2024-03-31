import { GithubIcon, LinkedInIcon } from "@/components/server-only/icons";
import { paragraph } from "@/components/server-only/primitives";
import { Button, ButtonProps } from "@nextui-org/button";
import { Link, LinkProps } from "@nextui-org/link";
import clsx from "clsx";

const BTN_PROPS: ButtonProps = {
  as: Link,
  color: "default",
  size: "lg",
  className: clsx(paragraph({ size: "md" }), "w-60"),
  variant: "bordered",
};

export function ButtonGithub() {
  return (
    <Button
      {...(BTN_PROPS as any)}
      href="https://github.com/seongpil0948"
      showAnchorIcon
      startContent={<GithubIcon />}
    >
      Github
    </Button>
  );
}

export function ButtonLinkedIn() {
  return (
    <Button
      {...(BTN_PROPS as any)}
      href="https://www.linkedin.com/in/choi-seongpil-9910a0203"
      showAnchorIcon
      startContent={<LinkedInIcon />}
    >
      LinkedIn
    </Button>
  );
}

export function ButtonHome() {
  return (
    <Button {...(BTN_PROPS as any)} href="/" showAnchorIcon>
      To 🏠
    </Button>
  );
}
