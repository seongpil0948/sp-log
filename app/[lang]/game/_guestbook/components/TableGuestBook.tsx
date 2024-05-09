/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useCallback, useEffect } from 'react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { Spinner } from '@nextui-org/spinner'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/table'
import type { TGuestBook } from '../types'
import { GUEST_DB } from '../db'
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { getFBClientStore } from '@/config/firebase/clientApp'
import clsx from 'clsx'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/popover'
import { paragraph } from '@/components/server-only/primitives'
import { Button } from '@nextui-org/button'

// FIXME: unnecessary fetchItems
export default function BookTable() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [hasMore, setHasMore] = React.useState(true)
  const [lastData, setLastData] =
    React.useState<QueryDocumentSnapshot<TGuestBook | null, DocumentData>>()
  const [items, setItems] = React.useState<TGuestBook[]>([])
  const w = window.innerWidth

  const fetchItems = useCallback(async () => {
    console.count('fetchItems')
    if (!hasMore) return
    setIsLoading(true)
    try {
      const resp = await GUEST_DB.list(
        getFBClientStore(),
        {
          pageSize: 10,
          orderBy: 'createdAt',
          lastData: lastData,
        },
        '-1',
      )
      setHasMore(!resp.noMore)
      setLastData(resp.lastDoc)
      setItems([...items, ...resp.data])
      console.log('result of fetchItems', resp)
    } catch (error) {
      console.error('error on fetchItems', error)
      setHasMore(false)
    } finally {
      setIsLoading(false)
    }
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
      }}
    >
      <TableHeader>
        <TableColumn align="center" key="nameAlias">
          별칭
        </TableColumn>
        <TableColumn align="center" key="message">
          이야기
        </TableColumn>
        <TableColumn align="center" key="createdAt">
          생성일
        </TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={items}
        loadingContent={<Spinner color="white" />}
        emptyContent="No data"
      >
        {(item: TGuestBook) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className={clsx('max-w-20', paragraph({ size: 'sm' }))}>
                {item.nameAlias}
              </div>
            </TableCell>
            <TableCell>
              <PopoverMessage message={item.message} />
            </TableCell>
            <TableCell>
              <div className={clsx('max-w-20', paragraph({ size: 'sm' }))}>
                {item.createdAt.toLocaleDateString()}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export function PopoverMessage(props: { message: string }) {
  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <div
          className={clsx(
            'max-w-96 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer',
            paragraph({ size: 'sm' }),
          )}
        >
          {props.message}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 z-1000">
          <div className={clsx(paragraph({ size: 'md', font: 'gothic' }))}>
            {props.message}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
