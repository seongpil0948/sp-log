import clsx from 'clsx'
import Link from 'next/link'

import {tree} from './theme'

export interface TreeSectionProps {
  label: string
  href: string
  icon?: string
  children?: TreeSectionProps[]
}

export function TreeSection(props: {
  treeProps: TreeSectionProps[]
  startDepth?: number
  linkTextClass?: (label: string) => string
}) {
  let {startDepth} = props
  const {linkTextClass, treeProps} = props
  startDepth = startDepth || 0
  // const dispatch = useAppDispatch();
  const hasChildren = (item: TreeSectionProps) => item.children && item.children.length > 0

  const {wrapper, topMenu, menu, menuItem} = tree()
  return (
    <>
      {treeProps.length > 0 && (
        <>
          <ul className={wrapper()}>
            {treeProps.map(item => (
              <li
                key={item.href}
                className={clsx({
                  [topMenu()]: startDepth === 0,
                  [menu()]: startDepth !== 0,
                })}
              >
                <div className={menuItem()}>
                  {/* <Icon path={mdiFolder} size={0.8} /> */}
                  <Link
                    key={item.href}
                    href={item.href}
                    // onClick={() => {
                    //   console.log("click");
                    //   dispatch(setLoading(true));
                    // }}
                  >
                    <div className={clsx(`pl-${startDepth * 2}`, linkTextClass?.(item.label))}>{item.label}</div>
                  </Link>
                </div>
                {hasChildren(item) && <TreeSection treeProps={item.children!} startDepth={startDepth + 1} />}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
