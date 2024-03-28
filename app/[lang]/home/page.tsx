import { paragraph, title, typo } from "@/components/server-only/primitives";
import config, { TAvailLocale } from "@/config";
import { getDictionary } from "../dictionaries";
import GeoButton from "@/components/client-only/three-d/geo-button";
import { ThemeSwitch } from "@/components/theme-switch";
import clsx from "clsx";
import { AnimateBlink } from "@/components/client-only/animate/typo";
import { AbsoluteFooter } from "@/components/server-only/footers";
// import { useInView } from "react-intersection-observer";

export async function generateStaticParams() {
  return config.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  const btnClass = clsx(
    typo({
      size: "md",
      color: "foreground",
      font: "gothic",
      weight: "bold",
    })
  );
  return (
    <>
      <section className=" m-0 p-0 w-screen h-screen overflow-hidden flex flex-col justify-center align-middle text-center gap-20">
        <AnimateBlink>
          <h1 className={title({ color: "violet", size: "lg" })}>
            {dict.home.description.title}
          </h1>
        </AnimateBlink>

        <div className=" inline-flex gap-36 justify-center">
          {/* <GameButton text="Game" /> */}
          {/* <GameButton text="About" /> */}
          <GeoButton shape="basic" href="/docs">
            <p className={btnClass}>Knowledge</p>
          </GeoButton>
          <GeoButton shape="basic" href="/about">
            <p className={btnClass}>About</p>
          </GeoButton>
          <GeoButton shape="character" href="/game">
            <p className={btnClass}>Game</p>
          </GeoButton>
          <GeoButton shape="basic" href="/project">
            <p className={btnClass}>Projects</p>
          </GeoButton>
        </div>
      </section>
      <AbsoluteFooter />
    </>
  );
}
