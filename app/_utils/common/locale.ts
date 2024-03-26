import config from "@/config";

export function extractFromPath(path: string) {
  const locale = config.i18n.locales.find(
    (locale) => path.startsWith(`/${locale}/`) || path === `/${locale}`
  );
  const p = path
    .split("/")
    .filter((seg) => !(config.i18n.locales as string[]).includes(seg))
    .join("/");
  return { locale, path: p };
}
