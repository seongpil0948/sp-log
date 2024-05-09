import clsx from 'clsx'
import { tv } from 'tailwind-variants'

const uol =
  'my-2 md:my-5 list-inside bg-content1 text-foreground [blockquote_&]:my-0 md:p-2 rounded-2xl'

export default tv({
  base: '',
  slots: {
    ul: clsx(
      uol,
      "list-none  [&>li:before]:mr-2 md:[&>li:before]:mr-6 [&>li:before]:content-['-']",
    ),
    ol: clsx(uol, 'list-decimal'),
  },
})
