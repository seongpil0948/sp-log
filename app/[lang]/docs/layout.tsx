import { CmFooter } from '@/components/server-only/footers'
import CommonNavbar from '@/components/server-only/navbar'
import { main } from '@/config/variants/primitives'
import clsx from 'clsx'
import { Suspense } from 'react'

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CommonNavbar
        drawerProps={{
          title: 'Documentation',
        }}
        leftTreeOptions={{ dir: 'app/[lang]/docs' }}
      />
      <main
        id="content-container"
        className={clsx(
          main(),
          // 'overflow-auto w-full max-h-screen pb-12 px-6 sm:px-12 md:px-18 lg:px-24 xl-px-36 2xl:px-48',
          'overflow-auto max-h-screen container mx-auto w-full md:w-[80%] lg:w-[70%] xl:w-[calc(60%-3rem)]',
        )}
      >
        {children}
      </main>
      <CmFooter />
    </>
  )
}
