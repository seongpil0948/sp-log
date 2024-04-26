import { GithubIcon, LinkedInIcon } from "@/components/server-only/icons";
import { paragraph } from "@/components/server-only/primitives";
import { APP_DOMAIN } from "@/config/site";
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
const githubLink = "https://github.com/seongpil0948";
const linkedInLink = "https://www.linkedin.com/in/choi-seongpil-9910a0203";

interface BtnProps {
  isText?: boolean;
}
export function ButtonGithub(props: BtnProps) {
  if (props.isText)
    return (
      <Link isExternal size={BTN_PROPS.size} color="primary" href={githubLink}>
        {githubLink}
      </Link>
    );
  return (
    <Button
      {...(BTN_PROPS as any)}
      href={githubLink}
      showAnchorIcon
      startContent={<GithubIcon />}
    >
      Github
    </Button>
  );
}

export function ButtonLinkedIn(props: BtnProps) {
  if (props.isText)
    return (
      <Link
        href={linkedInLink}
        isExternal
        size={BTN_PROPS.size}
        color="primary"
      >
        {linkedInLink}
      </Link>
    );
  return (
    <Button
      {...(BTN_PROPS as any)}
      href={linkedInLink}
      showAnchorIcon
      startContent={<LinkedInIcon />}
    >
      LinkedIn
    </Button>
  );
}

export function ButtonHome(props: BtnProps) {
  if (props.isText)
    return (
      <Link href="/" isExternal size={BTN_PROPS.size} color="primary">
        {APP_DOMAIN}
      </Link>
    );
  return (
    <Button {...(BTN_PROPS as any)} href="/" showAnchorIcon>
      To 🏠
    </Button>
  );
}

export function ButtonExperience() {}
