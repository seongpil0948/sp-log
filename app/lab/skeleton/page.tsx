import { SkeletonDoc } from '@/components/server-only/loading/skeletons'
//<SkeletonDoc />
import { title } from '@/components/server-only/primitives'

export default function Page() {
  return (
    <div className="min-h-screen min-w-screen w-full h-full px-4 pt-15 mx-auto py-4   xl:w-4xl xl:py-20 justify-center align-middle text-center flex flex-col overflow-auto">
      <div className={title()}>Document Skeleton</div>
      <div className="min-h-screen min-w-screen w-full h-full px-4 pt-15 mx-auto py-4   xl:w-4xl xl:py-20 justify-center align-middle text-center flex">
        <SkeletonDoc />
      </div>
    </div>
  )
}
