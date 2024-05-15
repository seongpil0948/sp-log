'use client'
import type {ReactNode} from 'react'

import {Table, TableColumn, TableRow, TableCell, TableHeader, TableBody} from '@nextui-org/table'
import type {TableProps} from '@nextui-org/table'

type Key = TableProps['key']
interface KT {
  key: Key
  title: ReactNode
}
interface Row {
  key: Key
  cells: KT[]
}
interface Props {
  columns: KT[]
  rows: Row[]
}

export default function MdxTable(props: Props) {
  const {columns, rows} = props

  return (
    <Table aria-label="Example static collection table" className="my-7">
      <TableHeader>{...columns.map(col => <TableColumn key={col.key}>{col.title}</TableColumn>)}</TableHeader>
      <TableBody>
        {...rows.map(row => (
          <TableRow key={row.key}>
            {...row.cells.map(cell => <TableCell key={cell.key}>{cell.title}</TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
