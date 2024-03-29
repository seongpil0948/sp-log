import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { parseNumber } from "@/app/_utils/common";
import { Link as NextLink } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import CodeHeader from "@/components/server-only/CodeHeader";
import { DetailedHTMLProps, HTMLAttributes, createElement } from "react";
import clsx from "clsx";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { paragraph, title } from "./components/server-only/primitives";
import { Chip, ChipProps } from "@nextui-org/chip";
import { ChipList } from "./components/client-only/ChipList";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: (props: React.HTMLAttributes<HTMLAnchorElement>) => <Link {...props} />,
    // blockquote: (props) => (
    //   <blockquote
    //     className="my-6 rounded-xl border border-default-200 bg-default-200/20 px-4 py-3 italic dark:border-default-100 [&>p]:m-0"
    //     {...props}
    //   />
    // ),
    // code: (props) => (
    //   <code
    //     className={clsx(paragraph({ font: "script" }))}
    //     // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent px-0 py-0 font-mono text-small font-normal text-sky-400 before:content-['`'] after:content-['`']"
    //     // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent "
    //     {...props}
    //   />
    // ),
    h1: (props) => {
      const className = clsx(title({ size: "lg" }), "mt-24");
      return <HeaderWithLink attr={props} className={className} level={1} />;
    },
    h2: (props) => {
      const className = clsx(title({ size: "md", color: "blue" }), "mt-24");
      return <HeaderWithLink attr={props} className={className} level={2} />;
    },
    h3: (props) => {
      const className = clsx(title({ size: "sm" }), "mt-24");
      return <HeaderWithLink attr={props} className={className} level={3} />;
    },
    h4: (props) => {
      const className = clsx(title({ size: "xs" }), "mt-24");
      return <HeaderWithLink attr={props} className={className} level={4} />;
    },
    hr: (props) => (
      <div
        {...props}
        className="my-8 h-px w-full bg-slate-400 dark:bg-default-100"
      />
    ),
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt={props.alt ?? "abacus-image"}
        src={props.src ?? "/abacus.png"}
        width={parseNumber(props.width, 100)}
        height={parseNumber(props.height, 100)}
      />
    ),
    li: (props) => {
      // console.info('props', )
      // if (props.children[0].props?.children[0].props?.children[0] === '[]') {
      // if text is link
      let child = props.children;
      if (
        typeof props.children === "string" &&
        props.children.startsWith("http")
      ) {
        child = <Link href={props.children}>{props.children}</Link>;
      }
      return (
        <li className=" sm:text-md my-5  mb-2 text-sm font-normal leading-7 md:text-lg  [&::marker]:font-semibold [&:before]:mr-6 [&:before]:content-['-']">
          {child}
        </li>
      );
    },
    ol: (props) => {
      return (
        <ul
          className="mb-5 ml-5 mt-2 list-decimal [&>li:before]:mr-4 [&>li:before]:content-['']"
          {...props}
        />
      );
    },
    ul: (props) => {
      return <ul className="my-5 list-none [blockquote_&]:my-0" {...props} />;
    },
    p: (props) => <p className={clsx(paragraph())} {...props} />,
    pre: (props) => {
      return (
        <Snippet
          size="sm"
          radius="none"
          hideSymbol
          className="flex w-full"
          variant="bordered"
          style={{
            backgroundColor: "#282c34",
          }}
        >
          {/* <span className="flex whitespace-pre-wrap p-7 text-sm leading-6"> */}
          <span className="flex whitespace-pre-wrap text-sm leading-6">
            <pre
              tabIndex={0}
              data-language="tsx"
              className="flex"
              data-theme="github-dark-dimmed"
              style={{
                backgroundColor: "transparent",
                color: "rgb(173, 186, 199)",
              }}
            >
              {props.children}
            </pre>
          </span>
        </Snippet>
      );
    },

    table: (props) => (
      <table className="w-full border-collapse">{props.children}</table>
    ),
    th: (props) => (
      <th className="whitespace-nowrap border border-gray-200 bg-gray-100 px-4 py-2">
        {props.children}
      </th>
    ),
    td: (props) => (
      <td className="border border-gray-200 px-4 py-2">{props.children}</td>
    ),
    CodeHeader,
    Chip,
    Card,
    CardBody,
    CardHeader,
    ChipList,
  };
}

const Link = ({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) => {
  return (
    <NextLink
      href={href}
      // isExternal={!href?.startsWith('/') && !href?.includes(APP_DOMAIN)}
      showAnchorIcon
      underline="hover"
      color="foreground"
    >
      {children}
    </NextLink>
  );
};

const HeaderWithLink = (props: {
  attr: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >;
  level: number;
  className?: string;
}) => {
  const { attr, level, className } = props;
  const text = typeof attr.children === "string" ? attr.children : "";
  const slug = text.toLowerCase().replaceAll(" ", "-");

  return createElement(
    `h${level}`,
    {
      ...attr,
      id: slug,
      className,
    },
    [
      createElement(
        "a",
        { href: `#${slug}`, key: attr.id ?? slug },
        props.attr.children
      ),
    ]
  );
};
