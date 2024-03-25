import { AVAIL_LOCALES, TAvailLocale } from "@/config";
import Content from "./content.mdx";

import { ResolvingMetadata, Metadata } from "next";
import { getDictionary } from "@/app/[lang]/dictionaries";

import commonConfig from "@/config";
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

type Props = {
  params: { lang: TAvailLocale };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params: { lang } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const dict = await getDictionary(lang);
  return {
    title: "Linux's Log Rotate Daemon (logrotate)",
    description: "Linux logrotate daemon service",
  };
}

export default async function SSGPage({ params: { lang } }: Props) {
  return (
    <div>
      <Content />
    </div>
  );
}
