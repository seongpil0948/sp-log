// import Image from "next/image";
import CodeHeader from '@/components/server-only/CodeHeader'
import themeList from '@/config/variants/list'

import {Card, CardBody, CardHeader} from '@nextui-org/card'
import {Chip} from '@nextui-org/chip'
import {Image} from '@nextui-org/image'
import {Link as NextLink} from '@nextui-org/link'
import {Snippet} from '@nextui-org/snippet'
import clsx from 'clsx'
import type {MDXComponents} from 'mdx/types'

import {ChipList} from './components/client-only/ChipList'
import {AlertText} from './components/server-only/alert'
import {HeaderLink} from './components/server-only/text/HeaderLink'
import preTheme from './config/variants/pre'
import {listText, paragraph} from './config/variants/primitives'
import tableTheme from './config/variants/table'

const {ul: ulClasses, ol: olClasses} = themeList()
const {table, th, td} = tableTheme()
const {container: preContainer, pre: preCls} = preTheme()
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
    code: props => (
      <code
        className={clsx(listText({font: 'mono', color: 'primary'}), "!before:content-[''] !after:content-['']")}
        // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent px-0 py-0 font-mono text-small font-normal text-sky-400"
        // className="inline-block h-fit whitespace-nowrap rounded-small bg-transparent "
        {...props}
      />
    ),
    h1: props => {
      return <HeaderLink attr={props} level={1} />
    },
    h2: props => {
      return <HeaderLink attr={props} level={2} />
    },
    h3: props => {
      return <HeaderLink attr={props} level={3} />
    },
    h4: props => {
      return <HeaderLink attr={props} level={4} />
    },
    hr: props => <div {...props} className={hrCls} />,
    img: props => (
      <Image
        className="mb-6 min-w-full rounded-lg max-h-[50vh] mx-auto"
        isBlurred
        alt={props.alt ?? 'abacus-image'}
        src={props.src ?? '/abacus.png'}
      />
    ),
    li: props => {
      // console.info('props', )
      // if (props.children[0].props?.children[0].props?.children[0] === '[]') {
      // if text is link
      let child = props.children
      if (typeof props.children === 'string' && props.children.startsWith('http')) {
        child = <Link href={props.children}>{props.children}</Link>
      }
      return <li className={clsx(listText({color: 'default'}))}>{child}</li>
    },
    ol: props => {
      return <ul className={clsx(olClasses())} {...props} />
    },
    ul: props => {
      return <ul className={clsx(ulClasses())} {...props} />
    },
    p: props => <p className={clsx(paragraph({size: 'lg'}))} {...props} />,
    // figure: (props) => (
    //   <figure className={clsx(props.className, "my-6!")} {...props} />
    // ),
    pre: props => {
      return (
        <Snippet
          size="sm"
          radius="none"
          hideSymbol
          variant="bordered"
          classNames={{
            copyButton: 'text-white',
            base: 'flex w-full my-2 md:my-4',
          }}
          style={{
            backgroundColor: '#282c34',
          }}
        >
          {/* <span className="flex whitespace-pre-wrap p-7 text-sm leading-6"> */}
          <span className={preContainer()}>
            <pre
              tabIndex={0}
              data-language="tsx"
              data-theme="github-dark-dimmed"
              style={{
                color: 'rgb(173, 186, 199)',
              }}
              className={preCls()}
            >
              {props.children}
            </pre>
          </span>
        </Snippet>
      )
    },

    table: props => <table className={table()}>{props.children}</table>,
    th: props => <th className={th()}>{props.children}</th>,
    td: props => <td className={td()}>{props.children}</td>,
    CodeHeader,
    Chip,
    Card: props => (
      <Card
        {...props}
        classNames={{
          header: 'py-0',
          body: 'py-0',
        }}
      />
    ),
    CardBody,
    CardHeader,
    ChipList,
    AlertText,
  }
}

const Link = ({href, children}: {href?: string; children?: React.ReactNode}) => {
  return href ? (
    <NextLink
      href={href}
      // isExternal={!href?.startsWith('/') && !href?.includes(APP_DOMAIN)}
      showAnchorIcon
      underline="hover"
      color="foreground"
      // inherit text
      className="hover:underline"
      style={{
        fontSize: 'inherit',
      }}
    >
      {children}
    </NextLink>
  ) : (
    <span>{children}</span>
  )
}

// const HeaderLink = (props: {
//   attr: DetailedHTMLProps<
//     HTMLAttributes<HTMLHeadingElement>,
//     HTMLHeadingElement
//   >
//   level: number
//   className?: string
// }) => {
//   const { attr, level, className } = props
//   const text = typeof attr.children === 'string' ? attr.children : ''
//   const slug = text.toLowerCase().replaceAll(' ', '-')

//   return createElement(
//     `h${level}`,
//     {
//       ...attr,
//       id: slug,
//       className,
//     },
//     [
//       createElement(
//         'a',
//         { href: `#${slug}`, key: attr.id ?? slug },
//         props.attr.children,
//       ),
//     ],
//   )
// }

export const hrCls = 'my-8 h-px w-full bg-slate-400 dark:bg-default-100'
