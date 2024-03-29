import { redirect } from "next/navigation";
import { TAvailLocale } from "@/config";
import commonConfig from "@/config";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return redirect(`/${lang}/docs/framework-next/convention/structure`);
}
