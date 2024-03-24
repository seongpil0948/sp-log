import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/server-only/primitives";
import { GithubIcon } from "@/components/server-only/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Make&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>
          websites regardless of your design experience.
        </h1>
        <h2 className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          href={"/game"}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Game
        </Link>
        <Link
          isExternal
          href={siteConfig.links.docs}
          className={buttonStyles({
            color: "secondary",
            radius: "full",
            variant: "bordered",
          })}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/game/world"
        >
          World
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/game/onemin"
        >
          onemin
        </Link>
        <Link
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="/game/domino"
        >
          domino
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideSymbol hideCopyButton variant="flat">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
