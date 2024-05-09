import { CmFooter } from '@/components/server-only/footers'
import CommonNavbar from '@/components/server-only/navbar'
import { main } from '@/components/server-only/primitives'
import clsx from 'clsx'

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
          'overflow-auto w-full max-h-screen pb-12 px-6 sm:px-12 md:px-18 lg:px-24 xl-px-36 2xl:px-48',
        )}
      >
        {children}
      </main>
      <CmFooter />
    </>
  )
}
