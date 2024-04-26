import clsx from "clsx";
import commonConfig, { TAvailLocale } from "@/config";
import { AbsoluteFooter } from "@/components/server-only/footers";
import { docsSectionCls, sectionCls } from "../../home/theme";
import { paragraph, title } from "@/components/server-only/primitives";
import { Experience, experiences } from "./data";
import { hrCls } from "@/mdx-components";
import LinksContent from "../_components/LinksContent";

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map((lang) => ({ lang }));
}

interface Param {
  params: { lang: TAvailLocale };
}

export default async function SSGPage({ params: { lang } }: Param) {
  return (
    <>
      <ExpPage />
      <AbsoluteFooter disableDarkMode goHome disableText />
    </>
  );
}
export function ExpPage() {
  return (
    <div className={clsx(sectionCls, docsSectionCls)}>
      <h1 className={clsx(title({ size: "lg" }))}>Experience</h1>
      <div
        className={clsx(
          "divide-y divide-gray-200 flex flex-col gap-6 md:gap-12"
        )}
      >
        {experiences.map((e, i) => {
          return <ExperienceCard key={`experience-${i}`} e={e} />;
        })}
      </div>
      <LinksContent isText={true} />
    </div>
  );
}

function ExperienceCard(props: { e: Experience }) {
  const { e } = props;
  const subtitleCls = clsx(title({ size: "xs" }));
  return (
    <div className={clsx()}>
      <h2 className={subtitleCls}>Challenges</h2>
      <div>
        <Paragraphs ps={e.challenges} name="challenges" />
      </div>
      <h2 className={subtitleCls}>Solutions</h2>
      <div>
        <Paragraphs ps={e.solutions} name="solutions" />
      </div>
      <h2 className={subtitleCls}>Achieves</h2>
      <div>
        <Paragraphs ps={e.achieves} name="achieve" />
      </div>
      <div className={hrCls}></div>
    </div>
  );
}

function Paragraphs(props: { ps: string[]; name: string }) {
  return (
    <div>
      {props.ps.map((p, i) => {
        return (
          <div
            className={clsx(
              paragraph({
                block: true,
                size: "xs",
              }),
              "w-[50vw] text-wrap"
            )}
            key={`${props.name}-${i}`}
          >
            {p}
          </div>
        );
      })}
    </div>
  );
}
