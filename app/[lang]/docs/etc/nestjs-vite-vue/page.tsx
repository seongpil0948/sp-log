/* eslint-disable no-unused-vars */
import Content from "./content.mdx";

import commonConfig from "@/config";
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

import { TAvailLocale } from "@/config";
import { Metadata, ResolvingMetadata } from "next/types";
interface Param {
  params: { lang: TAvailLocale };
}

export async function generateMetadata(
  { params: { lang } }: Param,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Nestjs Vite Vue",
    description:
      " NestJs 서버로 Fullstack 개발을 위한 Vue3 프론트엔드 프로젝트를 Vite로 구성하는 방법.",
  };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  );
}
