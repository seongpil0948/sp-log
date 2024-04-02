import { title } from "@/components/server-only/primitives";
import config, { TAvailLocale } from "@/config";
import { getDictionary } from "../dictionaries";

import { AnimateBlink } from "@/components/client-only/animate/typo";
import { AbsoluteFooter } from "@/components/server-only/footers";
import CommonNavbar from "@/components/server-only/navbar";
import BottomButtons from "./_components/BottomButtons";
// import { useInView } from "react-intersection-observer";

export async function generateStaticParams() {
  return config.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);

  return (
    <>
      <CommonNavbar
        drawerProps={{
          title: "Home",
        }}
        leftTreeOptions={{ dir: "app/[lang]" }}
      />
      <section className=" m-0 p-0 w-screen h-screen overflow-hidden flex flex-col justify-center align-middle text-center gap-20">
        <AnimateBlink>
          <h1 className={title({ color: "violet", size: "lg" })}>
            {dict.home.description.title}
          </h1>
        </AnimateBlink>
        <BottomButtons />
      </section>
      <AbsoluteFooter />
    </>
  );
}
