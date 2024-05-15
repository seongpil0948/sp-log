import {CmFooter} from '@/components/server-only/footers'
import CommonNavbar from '@/components/server-only/navbar'
import {main, title} from '@/config/variants/primitives'

import clsx from 'clsx'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <CommonNavbar leftTreeOptions={{dir: 'app/[lang]'}} />
      <main className={clsx(main(), 'text-center', 'justify-center')}>
        <h1 className={title()}>Not Found</h1>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
      </main>
      <CmFooter />
    </div>
  )
}
