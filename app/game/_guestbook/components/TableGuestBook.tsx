/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useCallback, useEffect } from "react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import type { TGuestBook } from "../types";
import { GUEST_DB } from "../db";
import {
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { getFBClientStore } from "@/config/firebase/clientApp";

// FIXME: unnecessary fetchItems
export default function BookTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [lastData, setLastData] =
    React.useState<QueryDocumentSnapshot<TGuestBook | null, DocumentData>>();
  const [items, setItems] = React.useState<TGuestBook[]>([]);

  const fetchItems = useCallback(async () => {
    console.count("fetchItems");
    if (!hasMore) return;
    setIsLoading(true);
    try {
      const resp = await GUEST_DB.list(
        getFBClientStore(),
        {
          pageSize: 10,
          orderBy: "createdAt",
          lastData: lastData,
        },
        "-1"
      );
      setHasMore(!resp.noMore);
      setLastData(resp.lastDoc);
      setItems([...items, ...resp.data]);
      console.log("result of fetchItems", resp);
    } catch (error) {
      console.error("error on fetchItems", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: fetchItems,
  });

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

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
        base: "max-h-[520px] overflow-scroll",
        table: "min-h-[400px]",
      }}
    >
      <TableHeader>
        <TableColumn key="nameAlias">별칭</TableColumn>
        <TableColumn key="message">이야기</TableColumn>
        <TableColumn key="createdAt">생성일</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={items}
        loadingContent={<Spinner color="white" />}
        emptyContent="No data"
      >
        {(item: TGuestBook) => (
          <TableRow key={item.id}>
            {/* {(columnKey) => {
              console.info("columnKey", columnKey, item);
              return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
            }} */}
            <TableCell>{item.nameAlias}</TableCell>
            <TableCell>{item.message}</TableCell>
            <TableCell>{item.createdAt.toLocaleDateString()}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
