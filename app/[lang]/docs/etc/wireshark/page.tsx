import Content from "./content.mdx";

import commonConfig from "@/config";
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

import { TAvailLocale } from "@/config";
interface Param {
  params: { lang: TAvailLocale };
}

// eslint-disable-next-line no-unused-vars
export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <div>
      <Content />
    </div>
  );
}
