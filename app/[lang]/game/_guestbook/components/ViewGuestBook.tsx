'use client'
import {isMobile} from '@/app/_utils/client/responsive'
import {title} from '@/config/variants/primitives'

import {Card, CardBody, CardHeader} from '@nextui-org/card'
import {Tabs, Tab} from '@nextui-org/tabs'
import clsx from 'clsx'

import FormGuestBook from './FormGuestBook'
import BookTable from './TableGuestBook'

export default function ViewGuestBook() {
  const isM = isMobile()
  return (
    <Card className="max-w-full p-2 md:p-5">
      <CardHeader>
        <h2
          className={clsx(
            title({
              size: 'sm',
              fullWidth: true,
              font: 'gothic',
            }),
          )}
        >
          방명록
        </h2>
      </CardHeader>
      <CardBody className="overflow-auto md:p-3">
        <Tabs aria-label="Options" size={isM ? 'sm' : 'lg'} fullWidth variant="bordered">
          <Tab key="list" title="목록">
            <BookTable />
          </Tab>
          <Tab key="write" title="작성">
            <FormGuestBook />
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  )
}
