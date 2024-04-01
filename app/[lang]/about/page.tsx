import { paragraph } from "@/components/server-only/primitives";
import styles from "./styles.module.css";
import About from "./_components/About";
import clsx from "clsx";
import { getOnlyFiles } from "@/app/_utils/server/dir-tree";
import commonConfig, { TAvailLocale } from "@/config";
import AboutSectionEn from "./_components/AboutSectionEn";
import AboutSectionKo from "./_components/AboutSectionKo";
import { AbsoluteFooter } from "@/components/server-only/footers";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const certificates = getOnlyFiles("public/cert", { extensions: /\.png$/ });
  const certData = [...certificates];
  return (
    <div id="about-root" className={clsx(styles.about, paragraph())}>
      {lang === "ko" ? (
        <AboutSectionKo certData={certData} />
      ) : (
        <AboutSectionEn certData={certData} />
      )}
      <AbsoluteFooter disableDarkMode goHome disableText />
      <About rootSelector="#about-root" />
    </div>
  );
}
