import clsx from 'clsx'

import {typo} from '../../config/variants/primitives'

interface CodeHeaderProps {
  text: string
}

export default function CodeHeader({text}: CodeHeaderProps) {
  return (
    <div className="rounded-t-md bg-zinc-200 text-neutral-700 dark:bg-zinc-700 dark:text-neutral-300 mt-2 md:mt-4">
      <div className={clsx(typo({font: 'script', size: 'lg'}), 'pl-2 md:pl-6 !my-0')}>{text}</div>
    </div>
  )
}
