import clsx from 'clsx'
import {tv} from 'tailwind-variants'

export const preTheme = tv({
  base: '',
  slots: {
    container: 'flex whitespace-pre-wrap text-sm leading-6',
    pre: clsx('flex bg-transparent', 'w-full my-2 md:my-4'),
  },
})

export default preTheme
