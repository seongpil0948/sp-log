// IN_PROGRESS: https://nextjs.org/learn/basics/data-fetching/blog-data

import { title } from "@/components/server-only/primitives";
import { PROJECTS } from "../_logics/projects";
import { TAvailLocale } from "@/config";
import { getDictionary } from "../../dictionaries";

interface Param {
  params: { lang: TAvailLocale; id: string };
}

// is an array of segments matched by [...slug].js
export default async function PageSSG({ params: { lang, id } }: Param) {
  const post = await getPost({ id });
  const dict = await getDictionary(lang);
  if (!post) {
    return { notFound: true };
  }
  return (
    <div>
      <h1 className={title()}>Document Detail</h1>
      <h3>{post.id}</h3>
      {/* <div>{JSON.stringify(post, null, 4)}</div> */}
    </div>
  );
}
// generateStaticParams
export async function generateStaticParams() {
  return PROJECTS.map((x) => {
    return { id: x.id, fallback: false };
  });
}

async function getPost(params: { id: string }) {
  return Promise.resolve(PROJECTS.find((x) => x.id === params.id));
}
