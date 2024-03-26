import remarkGfm from "remark-gfm";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: false,
  },
  reactStrictMode: false,
  cleanDistDir: true,
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  // See Options section below.
  keepBackground: false,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm, remarkParse],

    rehypePlugins: [remarkRehype, [rehypePrettyCode, options], rehypeStringify],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
