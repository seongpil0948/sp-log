import config, { TAvailLocale } from "@/config";

export async function generateStaticParams() {
  return config.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
