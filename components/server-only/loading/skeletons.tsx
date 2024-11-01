'use client'
import {Card, CardBody, CardHeader} from '@nextui-org/card'
import {Skeleton} from '@nextui-org/skeleton'
import clsx from 'clsx'

export const SkeletonUser = () => (
  <div className="max-w-[300px] w-full flex items-center gap-3">
    <div>
      <Skeleton isLoaded={false} className="flex rounded-full w-12 h-12" />
    </div>
    <div className="w-full flex flex-col gap-2">
      <Skeleton isLoaded={false} className="h-3 w-3/5 rounded-lg" />
      <Skeleton isLoaded={false} className="h-3 w-4/5 rounded-lg" />
    </div>
  </div>
)
export const SkeletonHeader = () => <Skeleton isLoaded={false} className={clsx('rounded-lg w-1/2 h-6 my-4 md:my-6')} />

export const SkeletonText = () => <Skeleton isLoaded={false} className="w-3/5 rounded-lg h-3 " />
export const SkeletonContainer = () => (
  <Skeleton isLoaded={false} className="w-full rounded-lg h-[25vh] my-4 md:my-6 " />
)

export const SkeletonDoc = () => (
  <Card className="w-full space-y-5 p-4" radius="lg">
    <CardHeader>
      <SkeletonUser />
    </CardHeader>
    <CardBody className="flex flex-col gap-2 md:gap-4">
      <SkeletonHeader />

      <SkeletonContainer />
      <SkeletonContainer />
      <SkeletonContainer />
    </CardBody>
  </Card>
)

export function SkeletonCard() {
  return (
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">  
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}