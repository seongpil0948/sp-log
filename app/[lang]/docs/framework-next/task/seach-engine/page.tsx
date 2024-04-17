import { TAvailLocale } from "@/config";
import Content from "./content.mdx";

import commonConfig from "@/config";
import type { Metadata, ResolvingMetadata } from "next/types";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}
interface Param {
  params: { lang: TAvailLocale };
}

export async function generateMetadata(
  { params: { lang } }: Param,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Nextjs 검색 기능 구현",
    description: "Nextjs 검색 기능 구현",
  };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  );
}