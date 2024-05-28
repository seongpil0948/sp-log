'use client'

import { isMobile } from '@/app/_utils/client/responsive'
import { siteConfig } from '@/config/site'


import { Accordion, AccordionItem } from '@nextui-org/accordion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import CommonDrawer from '../../client-only/drawer'
import { TreeSection } from '../../client-only/tree-section'

import type { JSX, ReactNode } from 'react'
import type { TreeSectionProps } from '../../client-only/tree-section'
import type { CommonNavbarProps } from './client'

export function PrefixComp(props: CommonNavbarProps): ReactNode {
  const path = usePathname()
  const isM = isMobile()

  const defaultExpandedKeys = path.split('/')
  const {prefix, treeLeft, drawerProps} = props

  if (prefix) {
    return prefix
  }

  if (!treeLeft) {
    return <></>
  }
  const getTitleClass = (label: string) => {
    if (defaultExpandedKeys.includes(label)) {
      return 'text-primary-700 underline'
    } else {
      return ''
    }
  }
  const TitleComp = ({item}: {item: TreeSectionProps}) => {
    return (
      <Link key={item.href} href={item.href} color="foreground">
        <div className={getTitleClass(item.label)}>{item.label}</div>
      </Link>
    )
  }

  const renderAccordionItems = (items: TreeSectionProps[]): JSX.Element[] => {
    return items.map(item => {
      let child: null | JSX.Element = <TreeSection linkTextClass={getTitleClass} treeProps={item.children ?? []} />
      if (!item.children || item.children.length < 1) {
        child = null
      } else if (isChildGroup(item)) {
        child = (
          <Accordion isCompact={isM} defaultExpandedKeys={defaultExpandedKeys}>
            {renderAccordionItems(item.children)}
          </Accordion>
        )
      }
      return (
        <AccordionItem
          key={item.label}
          title={<TitleComp item={item} />}
          isCompact={isM}
          textValue={item.label}
          hideIndicator={child === null}
          disableIndicatorAnimation={child === null}
          disableAnimation={child === null}
          // onPress={(evt) => {
          //   if (child === null) {
          //     router.push(item.href);
          //   }
          // }}
          // onDoubleClick={(evt) => {
          //   evt.stopPropagation();
          //   router.push(item.href);
          // }}
        >
          {child}
        </AccordionItem>
      )
    })
  }

  const items = renderAccordionItems(treeLeft.children ?? [])
  const hasChildren = treeHasChildren(treeLeft)
  return (
    <CommonDrawer
      sheetProps={{
        placement: 'left',
        // defaultOpen: hasChildren,
        defaultOpen: false,
      }}
      {...drawerProps}
      title={drawerProps?.title ?? siteConfig.name}
    >
      {hasChildren ? (
        <Accordion defaultExpandedKeys={defaultExpandedKeys}>{items}</Accordion>
      ) : (
        <TreeSection linkTextClass={getTitleClass} treeProps={treeLeft.children ?? []} />
      )}
    </CommonDrawer>
  )
}

const treeHasChildren = (tree: TreeSectionProps) =>
  tree.children?.some(item => item.children && item.children?.length > 0)
const isChildGroup = (item: TreeSectionProps) =>
  treeHasChildren(item) && item.children!.map(c => c.children).flat().length > 0
