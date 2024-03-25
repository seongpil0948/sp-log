import { main } from "@/components/server-only/primitives";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: `Documentation`,
    template: `%s - kubernetes - ${siteConfig.name}`,
  },
  description: "fucking k8s",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const tree = getTree('app/[lang]/doc/kubernetes', { extensions: /\.mdx$/ })
  return <main className={main()}>{children}</main>;
}
