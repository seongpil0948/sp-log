import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/server-only/primitives";
import { GithubIcon } from "@/components/server-only/icons";
import config, { TAvailLocale } from "@/config";
import { getDictionary } from "../dictionaries";
import CommonNavbar from "@/components/server-only/navbar";

export async function generateStaticParams() {
  return config.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  const dict = await getDictionary(lang);
  return (
    <>
      <CommonNavbar
        drawerProps={{
          title: "Home",
        }}
        leftTreeOptions={{
          dir: "app/[lang]",
        }}
        locale={lang}
      />
      <main>
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
          <div className="inline-block max-w-lg text-center justify-center">
            <h1 className={title()}>{dict["home"]["teamName"]}</h1>
            <h1 className={title({ color: "violet" })}>
              {dict["home"]["description"]["title"]}&nbsp;
            </h1>
            <br />
            <h1 className={title()}>
              websites regardless of your design experience.
            </h1>
            <h2 className={subtitle({ class: "mt-4" })}>
              Beautiful, fast and modern React UI library.
            </h2>
            <p className="mb-12 mt-6 max-w-6xl text-xl text-default-500">
              {dict["home"]["description"]["summary1"]}
              <br />
              {dict["home"]["description"]["summary2"]}
              <br />
              {dict["home"]["description"]["summary3"]}
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            {siteConfig.links.map((link) => {
              return (
                <Link
                  key={link.href}
                  isExternal={link.external}
                  href={link.href}
                  className={buttonStyles({
                    color: "primary",
                    radius: "full",
                    variant: "shadow",
                  })}
                >
                  {link.label.en === "GitHub" && <GithubIcon />}
                  {link.icon}
                  {link.label.ko}
                </Link>
              );
            })}
          </div>

          <div className="mt-8">
            <Snippet hideSymbol hideCopyButton variant="flat">
              <span>
                Get started by editing <Code color="primary">app/page.tsx</Code>
              </span>
            </Snippet>
          </div>
        </section>
      </main>
    </>
  );
}
