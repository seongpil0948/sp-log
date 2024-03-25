import { siteConfig } from "@/config/site";
import { redirect } from "next/navigation";

export default function Home() {
  const target =
    siteConfig.links.find((link) => link.id === "home") ?? siteConfig.links[0];
  redirect(target.href);
}
