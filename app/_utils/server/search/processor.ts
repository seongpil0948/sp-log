import type { DirectoryTree } from "directory-tree";
import { SearchEngineCommon } from "./basic";
import dirTree from "directory-tree";
import fs from "fs/promises";
import { pathToHref } from "../dir-tree";

export async function initializedSearchBasic(engine: SearchEngineCommon) {
  engine.clear();
  const libTree = dirTree(
    "app",
    { exclude: /home|[id]]/ },
    undefined,
    (item) => {
      return isDocName(item);
    }
  );
  console.info("libTree: ", libTree);
  const treeList = toList(libTree);

  for (const link of treeList) {
    // read file content
    const fileContent = await fs.readFile(link.path, "utf-8");
    const href = pathToHref(link.path);

    const obj = splitContent(fileContent);
    for (const { title, content } of obj) {
      engine.addDoc({ href, content, title });
    }
  }
}

function splitContent(markdown: string): { title: string; content: string }[] {
  const regex = /#+\s*(.*?)(?=\n#+\s*|$)/gm;
  const titles = markdown.match(regex);
  if (!titles) return [];
  const contents = markdown.split(regex).slice(1);
  return titles
    .map((title, index) => {
      const content = extractKoreanAndEnglishWithUrl(contents[index]);
      return { title: sanitizeText(title), content: sanitizeText(content) };
    })
    .filter(({ title, content }) => title.length > 2 && content.length > 10);
}

function sanitizeText(t: string): string {
  t = t.replace(/#/g, "");
  t = t.replace(/\n/g, " ");
  // remove same words
  t = t
    .split(" ")
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, [] as string[])
    .join(" ")
    .trim();
  // return t.trim();
  return t;
}

function extractKoreanAndEnglishWithUrl(str: string): string {
  const koreanNumRegex =
    /[\uAC00-\uD7A3\u1100-\u11FF가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9_-]/;
  const englishRegex = /[a-zA-Z]/;
  const urlRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:[-\;:&=\+\$,\w]+)?)(?:\/[^\s]*)?)/;

  const chars = str.split("");
  const filteredChars = chars.filter((char) => {
    return (
      koreanNumRegex.test(char) ||
      englishRegex.test(char) ||
      urlRegex.test(char.toLowerCase()) || // HTTP, HTTPS 모두 인식
      /\s/.test(char) // 띄어쓰기 유지
    );
  });

  return filteredChars.join("");
}

const isDocName = (p: { name: string }) =>
  // p.name.endsWith(".ts") ||
  // p.name.endsWith(".tsx") ||
  p.name.endsWith(".mdx") || p.name.endsWith(".md");

function toList(tree?: DirectoryTree) {
  const list: DirectoryTree[] = [];
  if (!tree || !tree.children) return list;

  for (const child of tree.children) {
    if (isDocName(child)) {
      list.push(child);
    }
    if (child.children) {
      list.push(...toList(child));
    }
  }
  return list;
}
