import commonConfig, { TAvailLocale } from "@/config";
import { getDictionary } from "@/app/[lang]/dictionaries";
import ProjectComponent from "@/app/[lang]/project/_components/ProjectComponent";
export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}
interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  return (
    <div className=" w-screen h-screen overflow-hidden">
      <ProjectComponent />
    </div>
  );
}
