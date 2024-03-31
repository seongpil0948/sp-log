import {
  listText,
  main,
  paragraph,
  title,
  typo,
  ulText,
} from "@/components/server-only/primitives";
import { PROJECTS } from "../_logics/projects";
import { TAvailLocale } from "@/config";
import { getDictionary } from "../../dictionaries";
import clsx from "clsx";
import {
  ProjectTypeIcon,
  ProjectUsing,
} from "../_components/server-only/icons";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/chip";
import { CmFooter } from "@/components/server-only/footers";
import { BasicCarousel } from "@/components/client-only/Carousel";
import CommonNavbar from "@/components/server-only/navbar";
import { Link } from "@nextui-org/link";
import commonConfig from "@/config";
import { notFound } from "next/navigation";
interface Param {
  params: { lang: TAvailLocale; id: string };
}

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
// export const dynamic = "force-static";
// export const dynamicParams = false;
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
// export async function generateStaticParams() {
//   return PROJECTS.map((x) => ({ id: x.id, fallback: true }));
// }

// is an array of segments matched by [...slug].js
export default async function PageSSG({ params: { lang, id } }: Param) {
  const post = await getPost({ id });
  const dict = await getDictionary(lang);
  const roles = [...(post?.roleDetail ?? []), post?.myRole];
  if (!post) {
    return notFound();
  }
  return (
    <div className={"overflow-auto h-screen"}>
      <CommonNavbar leftTreeOptions={{ dir: "app/[lang]" }} />
      <div
        className={clsx(
          main({ justify: "start", size: "lg" }),
          typo({ font: "gothic" }),
          "px-8 mt-4 mb-8"
        )}
      >
        <h1 className={title()}>{post.title}</h1>
        {post.titleImg && <Image alt="title Image" src={post.titleImg} />}
        {post.description &&
          post.description.map((desc, idx) => (
            <p key={idx} className={paragraph()}>
              {desc}
            </p>
          ))}
        <div className="flex justify-start gap-4">
          <ProjectTypeIcon projType={post.projType} />
          <ProjectUsing p={post} />
        </div>

        <h3 className={title({ size: "sm" })}> My Role </h3>
        <div className="flex gap-3">
          {roles.map((r) => (
            <Chip
              variant="bordered"
              key={r}
              className={typo({ size: "sm", weight: "bold" })}
            >
              {r}
            </Chip>
          ))}
        </div>
        <h3 className={title({ size: "sm" })}> Tools </h3>
        <div className="flex gap-3">
          {post.usingDetail.map((r) => (
            <Chip
              variant="faded"
              color="secondary"
              key={r}
              className={typo({ size: "sm", weight: "bold" })}
            >
              {r}
            </Chip>
          ))}
        </div>
        <h3 className={title({ size: "sm" })}> 해결한 주요 이슈 </h3>
        <ul className={ulText()}>
          {post.earned.map((desc, idx) => (
            <li key={idx} className={listText({ size: "md" })}>
              {desc}
            </li>
          ))}
        </ul>
        <h3 className={title({ size: "sm" })}> 모든 이미지 </h3>
        {post.allImg && <BasicCarousel urls={post.allImg} />}
        {post.to && (
          <>
            <h3 className={title({ size: "sm" })}> 외부 링크 </h3>
            <Link href={post.to} target="_blank" color="primary" isExternal>
              {post.to}
            </Link>
          </>
        )}
      </div>
      <CmFooter />
    </div>
  );
}
// generateStaticParams

async function getPost(params: { id: string }) {
  return Promise.resolve(PROJECTS.find((x) => x.id === params.id));
}
