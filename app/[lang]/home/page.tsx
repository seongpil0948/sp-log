import { title } from "@/components/server-only/primitives";
import config, { TAvailLocale } from "@/config";
import { getDictionary } from "../dictionaries";

import { AnimateBlink } from "@/components/client-only/animate/typo";
import { AbsoluteFooter } from "@/components/server-only/footers";
import CommonNavbar from "@/components/server-only/navbar";
import BottomButtons from "./_components/BottomButtons";
import clsx from "clsx";
import { NavInput } from "@/components/server-only/navbar/client";
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
      <section className="pb-12  m-0 w-screen h-screen overflow-hidden flex flex-col justify-center align-middle text-center gap-7 md:gap-12 lg:gap-16">
        <AnimateBlink>
          <h1 className={clsx(title({ color: "violet", size: "lg" }), "mt-7")}>
            {dict.home.description.title}
          </h1>
        </AnimateBlink>
        {/* <BottomButtons /> */}
        <div className=" max-w-md mx-auto">
          <NavInput />
        </div>
      </section>
      <AbsoluteFooter />
    </>
  );
}
