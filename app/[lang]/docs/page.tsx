import Content from "./content.mdx";

import commonConfig, { TAvailLocale } from "@/config";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { redirect } from "next/navigation";
import { redirectUris } from "@/config/site";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}
interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  return redirect(redirectUris.docs);
}
