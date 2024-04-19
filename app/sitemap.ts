import { MetadataRoute } from "next";
import { getTree } from "./_utils/server/dir-tree";
import { APP_DOMAIN, reduceChildLinks, siteConfig } from "@/config/site";
import { uniqueFilter } from "./_utils/common";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const innerLinks = getAllInnerLinks();
  const allLinks: MetadataRoute.Sitemap = uniqueFilter(
    [
      ...innerLinks,
      APP_DOMAIN,
      ...[...(Object.values(siteConfig.links.map((x) => x.href)) as string[])],
    ].map((path) => {
      const obj = {
        url: pathToUrl(path),
        lastModified: new Date(),
        changeFrequency:
          "weekly" as MetadataRoute.Sitemap[number]["changeFrequency"],
        priority: 1,
      };
      return obj;
    })
  );
  if (process.env.NODE_ENV === "development") {
    saveToAlgoliaJson(innerLinks);
  }

  return allLinks;
}

function pathToUrl(u: string) {
  if (u.startsWith("http")) return u;
  else if (u.startsWith("/")) {
    return `${APP_DOMAIN}${u}`;
  } else {
    return `${APP_DOMAIN}/${u}`;
  }
}

function getAllInnerLinks() {
  const allInnerLinks: string[] = [];
  if (allInnerLinks.length > 0) return allInnerLinks;
  const tree = getTree({ dir: "app" });
  if (!tree) return [];
  const links = reduceChildLinks(tree);
  allInnerLinks.push(...links);
  return allInnerLinks;
}

const ALGOLIA_CONFIG_FILE = "algolia/config.json";
function saveToAlgoliaJson(innerLinks: string[]) {
  const start_urls = innerLinks.map((path) => ({
    url: pathToUrl(path),
    selectors_key: "default",
  }));
  const filePath = path.resolve(ALGOLIA_CONFIG_FILE);
  // load json file
  const config = JSON.parse(readFileSync(filePath, "utf-8"));
  // update start_urls
  config.start_urls = start_urls;

  return writeFileSync(filePath, JSON.stringify(config, null, 2), "utf-8");
}
