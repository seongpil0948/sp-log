import Domino from "../_components/client-only/Domino";

import commonConfig, { TAvailLocale } from "@/config";
import { getDictionary } from "@/app/[lang]/dictionaries";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}
interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  return (
    <div>
      <Domino />
    </div>
  );
}