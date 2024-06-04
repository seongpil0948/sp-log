'use client'

import { useMemo, useState } from 'react';

import { faker } from '@faker-js/faker';
import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/table';

function makeObj () {
  return {
    branch: faker.git.branch(),
    commitDate: faker.git.commitDate(),
    commitMessage: faker.git.commitMessage(),
    id: faker.git.commitSha(),
    commitEntry: faker.git.commitEntry(),
  }
}
type TObject = ReturnType<typeof makeObj>

function getExpensiveObjects(n=5000) {
  const arr: TObject[] = []
  for (let i = 0; i < n; i++) {
    arr.push(makeObj())
  }
  return arr
}
type TObjMap = Map<string, TObject>
function getExpensiveObj(): TObjMap {
const objects = getExpensiveObjects()
const map = new Map<string, TObject>()
for (const obj of objects) {
  map.set(obj.id, obj)
}
return map

}

export default function Lab() {
  console.log('ho')
  const columns: (keyof TObject)[] = ['branch', 'commitDate', 'commitMessage', 'id', 'commitEntry']
  const [objMap, setObjMap] = useState<TObjMap | null>(null)
  const list = useMemo(() => getExpensiveObjects(500), [])

  const handleSetObjMap = () => {
    setObjMap(getExpensiveObj())
  }

  
  return (
    <>
      <Button  size="lg" onClick={handleSetObjMap}>
        SetObjMap
      </Button>
   {objMap && <Card >
      <CardBody>
        <p>key length of map: {objMap.size}</p>
      </CardBody>
    </Card>      }
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column}>{column}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {list.map((row) =>
          <TableRow key={row.id}>
            {(columnKey) => <TableCell>{getKeyValue(row, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

    </>
  )
}
