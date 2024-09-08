// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { getFBClientStore } from '@/config/firebase/clientApp'
import { paragraph } from '@/config/variants/primitives'
import React, { useCallback, useEffect } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { Spinner } from '@nextui-org/spinner'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/table'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import clsx from 'clsx'
import { type DocumentData, type QueryDocumentSnapshot } from 'firebase/firestore'

import { GUEST_DB } from '../db'

import { useWindowSize } from '@/app/_utils/client/responsive'
import type { TGuestBook } from '../types'
  function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

// FIXME: unnecessary fetchItems
export default function BookTable() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [lastData, setLastData] = React.useState<QueryDocumentSnapshot<TGuestBook | null, DocumentData>>()
  const [items, setItems] = React.useState<TGuestBook[]>([])
  const { windowSize} = useWindowSize()

  const fetchItems = useCallback(() => {
    console.count('fetchItems')
    if (!hasMore) return
    setIsLoading(true)
    GUEST_DB.list(
      getFBClientStore(),
      {
        pageSize: 10,
        orderBy: 'createdAt',
        lastData: lastData,
      },
      '-1',
    ).then((resp) => {
      setHasMore(!resp.noMore)
      setLastData(resp.lastDoc)
      setItems([...items, ...resp.data])
      console.log('result of fetchItems', resp)
    }).catch((error) => {
      console.error('error on fetchItems', error)
      setHasMore(false)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: fetchItems,
  })

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return (
    <Table
      isHeaderSticky
      isVirtualized
      isStriped
      aria-label="Book table with infinite pagination"
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="white" />
          </div>
        ) : null
      }
      classNames={{
        base: 'max-h-[520px] overflow-scroll',
        table: 'min-h-[400px]',
        td: 'text-ellipsis overflow-hidden whitespace-nowrap',
        th: 'text-ellipsis overflow-hidden whitespace-nowrap',
      }}
    >
      <TableHeader>
        <TableColumn  align="center" key="nameAlias">
          별칭
        </TableColumn>
        <TableColumn  align="center" key="message">
          이야기
        </TableColumn>
        {<TableColumn  align="center" key="createdAt">
          생성일
        </TableColumn>}
      </TableHeader>
      <TableBody isLoading={isLoading} items={items} loadingContent={<Spinner color="white" />} emptyContent="누가 방명록좀 남겨줄사람..">
        {(item: TGuestBook) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className={clsx(paragraph({size: 'sm'}))}>{truncateText(item.nameAlias, 8)}</div>
            </TableCell>
            <TableCell>
              <PopoverMessage message={truncateText(item.message, 10)} />
            </TableCell>
            <TableCell>
              <div className={clsx(paragraph({size: 'sm'}))}>{item.createdAt.toLocaleDateString()}</div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export function PopoverMessage(props: {message: string}) {
  return (
    <Popover showArrow={true}>
      <PopoverTrigger>
        <div
          className={clsx(
            'max-w-96 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer',
            paragraph({size: 'sm'}),
          )}
        >
          {props.message}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 z-1000">
          <div className={clsx(paragraph({size: 'md', font: 'gothic'}))}>{props.message}</div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
