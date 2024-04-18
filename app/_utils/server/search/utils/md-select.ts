import type { DirectoryTree } from "directory-tree";
import { readFile } from "fs/promises";
import { pathToHref } from "../../dir-tree";
import { SearchDoc } from "@/app/api/search/types";
import { unified } from "unified";
import markdown from "remark-parse";
import html from "remark-rehype";
import { select, selectAll } from "hast-util-select";
import { toHast } from "mdast-util-to-hast";
import { sanitizeText, splitContent } from "./text";

type El = ReturnType<typeof select>;

function makeElToDoc(href: string, titleEl: El, contentEls: El[]): SearchDoc {
  const title = getNestedText(titleEl);
  const content = contentEls.map(getNestedText).join(" ");
  return {
    title,
    href: href,
    content: content,
  };
}
function findElSiblingsUntilSelect(target: El, until: string): El[] {
  return [];
}
function exploreAnyHeaders(el: El, href: string) {
  const docs: SearchDoc[] = [];
  if (!el) {
    return docs;
  }
  const headSelectSrc = "h1, h2, h3, h4, h5, h6";
  const headEls = selectAll(headSelectSrc, el);
  if (headEls.length > 0) {
    for (let i = 0; i < headEls.length; i++) {
      const headEl = headEls[i];
      const childDocs = exploreAnyHeaders(headEl, href);
      if (childDocs.length > 0) {
        docs.push(...childDocs);
      } else {
        const contentEls = findElSiblingsUntilSelect(headEl, headSelectSrc);
        docs.push(makeElToDoc(href, headEl, contentEls));
      }
    }
  }
  return docs;
}

const processor = unified().use(markdown).use(html);
export async function getDocsFromMd(link: DirectoryTree) {
  const docs: SearchDoc[] = [];
  const fileContent = String(await readFile(link.path, "utf-8"));
  let href = pathToHref(link.path);
  const tree = processor.parse(fileContent);
  const hast = toHast(tree);
  const rawDocs = selectAll("*", hast).reduce((acc, el) => {
    acc.push(...exploreAnyHeaders(el, href));
    return acc;
  }, [] as SearchDoc[]);
  for (const { title, content } of rawDocs) {
    // TODO
    if (title.length < 3 || content.length < 10) continue;
    const linkId = title.toLowerCase().replaceAll(" ", "-");
    href = `${href}#${linkId}`;

    docs.push({
      title: title,
      href: href,
      content: content,
    });
  }

  return docs;
}

export function findFirstText(elArr: El[]): string {
  if (!elArr.length) throw new Error("el arr is empty");
  const _findFirstText = (el?: El): string | undefined => {
    if (!el) return;
    if (el.children) {
      for (const child of el.children) {
        if (child.type === "text") {
          return child.value;
        }
        if (child.type === "element") {
          return _findFirstText(child);
        }
      }
    }
  };

  for (const el of elArr) {
    const text = _findFirstText(el);
    if (text) return text;
  }
  return "";
}

export function getNestedText(el: El): string {
  if (!el) return "";
  if (el.children) {
    return el.children
      .map((child) => {
        if (child.type === "text") {
          return sanitizeText(child.value);
        }
        if (child.type === "element") {
          return getNestedText(child);
        }
        return "";
      })
      .join(" ");
  }
  return "";
}
