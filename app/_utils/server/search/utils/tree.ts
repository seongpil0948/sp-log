import type { DirectoryTree } from "directory-tree";

export function toList(tree?: DirectoryTree) {
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

export function isDocName(p: { name: string }) {
  return p.name.endsWith(".mdx") || p.name.endsWith(".md");
}
