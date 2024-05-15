import clsx from 'clsx'
import {tv} from 'tailwind-variants'

export const tableTheme = tv({
  base: '',
  slots: {
    table: 'w-full border-collapse my-2 md:my-6',
    th: 'whitespace-nowrap border border-gray-200 bg-gray-100 px-4 py-2',
    td: 'border border-gray-200 px-4 py-2',
  },
})

export default tableTheme
