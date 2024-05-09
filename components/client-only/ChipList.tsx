import { Chip, ChipProps } from '@nextui-org/chip'
import React from 'react'
import { paragraph } from '../server-only/primitives'
import clsx from 'clsx'

export interface ChipListProps {
  tags: string[]
  chipProps?: ChipProps
  onClose?: (item: string, index: number) => void
  className?: string
}

const colors: ChipProps['color'][] = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
]
const variants: ChipProps['variant'][] = ['solid', 'bordered', 'faded']

export const ChipList = ({
  tags,
  chipProps,
  onClose,
  className,
}: ChipListProps) => {
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  const variant = variants[Math.floor(Math.random() * variants.length)]
  return (
    <div className={clsx('flex gap-1 mt-1', className)}>
      {tags.map((item, index) => (
        <Chip
          key={item + index}
          variant={variant}
          color={getRandomColor()}
          onClose={onClose ? () => onClose(item, index) : undefined}
          {...(chipProps as any)}
        >
          {item}
        </Chip>
      ))}
    </div>
  )
}
