import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/server-only/primitives";
import { GithubIcon } from "@/components/server-only/icons";
import config, { TAvailLocale } from "@/config";
import { getDictionary } from "../dictionaries";
import CommonNavbar from "@/components/server-only/navbar";
import { GameButton } from "@/components/client-only/three-d/game-button";

export async function generateStaticParams() {
  return config.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  return (
    <div className=" m-0 p-0 w-screen h-screen overflow-hidden">
      <h1 className={title({ color: "violet" })}>
        {dict.home.description.title}
      </h1>
      <GameButton text="Game" />
      <GameButton text="About" />
      <GameButton text="Knowledge" />
      <GameButton text="game" />
    </div>
  );
}
