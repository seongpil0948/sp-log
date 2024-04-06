import type { DirectoryTree } from "directory-tree";

const isDocName = (p: { name: string }) =>
  p.name.endsWith(".ts") ||
  p.name.endsWith(".tsx") ||
  p.name.endsWith(".mdx") ||
  p.name.endsWith(".md");
function toList(tree: DirectoryTree) {
  const list: DirectoryTree[] = [];
  if (!tree.children) return list;

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

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log(">>> Registering instrumentation for Node.js runtime >>> ");
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
    //   console.log(fileContent);
    // }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    console.log(">>> Registering instrumentation for Edge runtime >>>");
  }
}
