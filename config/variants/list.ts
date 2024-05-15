import {listbox} from '@nextui-org/theme'
import clsx from 'clsx'
import {tv} from 'tailwind-variants'

const {base} = listbox()
const uol = clsx(
  base(),
  'my-1 md:my-2 px-1 md:px-2 pb-1 md:pb-2 pt-4 pt-6  list-inside bg-content2  text-foreground [blockquote_&]:my-0  rounded-2xl [&>li]:my-1 lg:[&>li]:my-2',
)

export default tv({
  base: '',
  slots: {
    ul: clsx(uol, "list-none [&>li:before]:mr-2 md:[&>li:before]:mr-6 [&>li:before]:content-['-']"),
    ol: clsx(uol, 'list-decimal'),
  },
})
