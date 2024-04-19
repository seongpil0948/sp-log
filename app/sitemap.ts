import { MetadataRoute } from "next";
import { getTree } from "./_utils/server/dir-tree";
import { APP_DOMAIN, reduceChildLinks, siteConfig } from "@/config/site";
import { uniqueFilter } from "./_utils/common";

export default function sitemap(): MetadataRoute.Sitemap {
  const allLinks: MetadataRoute.Sitemap = uniqueFilter(
    [
      ...getAllInnerLinks(),
      APP_DOMAIN,
      ...[...(Object.values(siteConfig.links.map((x) => x.href)) as string[])],
    ].map((url) => {
      const obj = {
        url: url.trim(),
        lastModified: new Date(),
        changeFrequency:
          "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: 1,
      };
      const u = obj.url;
      if (u.startsWith("http")) return obj;
      else if (u.startsWith("/")) {
        obj.url = `${APP_DOMAIN}${u}`;
        return obj;
      } else {
        obj.url = `${APP_DOMAIN}/${u}`;
        return obj;
      }
    })
  );
  return allLinks;
}
const allInnerLinks: string[] = [];
function getAllInnerLinks() {
  if (allInnerLinks.length > 0) return allInnerLinks;
  const tree = getTree({ dir: "app" });
  if (!tree) return [];
  const links = reduceChildLinks(tree);
  allInnerLinks.push(...links);
  return allInnerLinks;
}
