// import type { DirectoryTree } from "directory-tree";
// import searchBasic from "./app/_utils/server/search";
// import { pathToHref } from "./app/_utils/server/dir-tree";

// const isDocName = (p: { name: string }) =>
//   // p.name.endsWith(".ts") ||
//   // p.name.endsWith(".tsx") ||
//   p.name.endsWith(".mdx") || p.name.endsWith(".md");
// function toList(tree: DirectoryTree) {
//   const list: DirectoryTree[] = [];
//   if (!tree.children) return list;

//   for (const child of tree.children) {
//     if (isDocName(child)) {
//       list.push(child);
//     }
//     if (child.children) {
//       list.push(...toList(child));
//     }
//   }
//   return list;
// }

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log(">>> Registering instrumentation for Node.js runtime >>> ");
    // searchBasic.clear();
    // const dirTree = (await import("directory-tree")).default;
    // const fs = require("fs/promises");
    // const libTree = dirTree(
    //   "app",
    //   { exclude: /home|[id]]/ },
    //   undefined,
    //   (item) => {
    //     return isDocName(item);
    //   }
    // );
    // const treeList = toList(libTree);

    // for (const link of treeList) {
    //   console.log(link);
    //   // read file content
    //   const fileContent = await fs.readFile(link.path, "utf-8");
    //   const href = pathToHref(link.path);
    //   const content = extractKoreanAndEnglishWithUrl(fileContent);
    //   console.log(">>> Adding doc to search index: ", href, content);
    //   searchBasic.addDoc(href, content);
    // }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    console.log(">>> Registering instrumentation for Edge runtime >>>");
  }
}

// function extractKoreanAndEnglishWithUrl(str: string): string {
//   const koreanRegex = /[ㄱ-ㅎㅏ-ㅣ]/;
//   const englishRegex = /[a-zA-Z]/;
//   const urlRegex =
//     /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:[-\;:&=\+\$,\w]+)?)(?:\/[^\s]*)?)/;

//   const chars = str.split("");
//   const filteredChars = chars.filter((char) => {
//     return (
//       koreanRegex.test(char) ||
//       englishRegex.test(char) ||
//       urlRegex.test(char.toLowerCase()) || // HTTP, HTTPS 모두 인식
//       /\s/.test(char) // 띄어쓰기 유지
//     );
//   });

//   return filteredChars.join("");
// }
