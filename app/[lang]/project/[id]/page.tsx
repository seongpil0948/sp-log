import { PROJECTS } from "../_logics/projects";
import { TAvailLocale } from "@/config";
import { CmFooter } from "@/components/server-only/footers";
import CommonNavbar from "@/components/server-only/navbar";
import { notFound } from "next/navigation";
import ProjectCardListHorizontal from "../_components/server-only/ProjectCardsHorizontal";
import { HeaderAbout } from "../../about/_components/Header";
import ProjectContent from "../_components/ProjectContent";

interface Param {
  params: { lang: TAvailLocale; id: string };
}
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
export const dynamic = "force-static";
export const dynamicParams = false;
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
export function generateStaticParams() {
  return PROJECTS.map((x) => ({ id: x.id, fallback: true }));
}
// is an array of segments matched by [...slug].js
export default async function PageSSG({ params: { lang, id } }: Param) {
  const post = await getPost({ id });
  // const dict = await getDictionary(lang)
  if (!post) {
    return notFound();
  }
  return (
    <div className={"overflow-y-auto overflow-x-hidden h-screen"}>
      <CommonNavbar leftTreeOptions={{ dir: "app/[lang]" }} />
      <ProjectContent post={post} />
      <>
        <HeaderAbout title="see more" />
        <ProjectCardListHorizontal />
      </>
      <CmFooter />
    </div>
  );
}
// generateStaticParams

async function getPost(params: { id: string }) {
  return Promise.resolve(PROJECTS.find((x) => x.id === params.id));
}
