import commonConfig from "@/config";
import { TAvailLocale } from "@/config";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return <section className="flex-center-col">{lang} Java</section>;
}
