import commonConfig from "@/config";
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

import { TAvailLocale } from "@/config";
interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return <section className="flex-center-col">{lang} Kubernetes</section>;
}
