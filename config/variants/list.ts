import clsx from 'clsx'
import { tv } from 'tailwind-variants'
import { listbox } from '@nextui-org/theme'

const { base } = listbox()
const uol = clsx(
  base(),
  'my-1 md:my-2 list-inside bg-slate-100 dark:bg-content1  text-foreground [blockquote_&]:my-0 md:p-2 rounded-2xl [&>li]:my-1 md:[&>li]:my-2',
)

export default tv({
  base: '',
  slots: {
    ul: clsx(
      uol,
      "list-none [&>li:before]:mr-2 md:[&>li:before]:mr-6 [&>li:before]:content-['-']",
    ),
    ol: clsx(uol, 'list-decimal'),
  },
})
