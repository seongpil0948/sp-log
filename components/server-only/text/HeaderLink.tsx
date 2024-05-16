import {title} from '@/config/variants/primitives'
import type {DetailedHTMLProps, HTMLAttributes} from 'react'

export function HeaderLink(props: {attr: TextToSlugProps['attr']; level: number}) {
  const {attr, level} = props
  const slug = textToSlug({attr})
  const headerProps = {
    id: slug,
  }
  const ChildComp = () => (
    <a href={`#${slug}`} key={attr.id ?? slug} className=" text-inherit">
      {attr.children}
    </a>
  )
  let HeaderComp = <h4></h4>
  switch (level) {
    case 1:
      HeaderComp = (
        <h1 {...headerProps} className={title({size: 'lg'})}>
          <ChildComp />
        </h1>
      )
      break
    case 2:
      HeaderComp = (
        <h2 {...headerProps} className={title({size: 'md'})}>
          <ChildComp />
        </h2>
      )
      break
    case 3:
      HeaderComp = (
        <h3 {...headerProps} className={title({size: 'sm'})}>
          <ChildComp />
        </h3>
      )
      break
    case 4:
      HeaderComp = (
        <h4 {...headerProps} className={title({size: 'xs'})}>
          <ChildComp />
        </h4>
      )
      break
    default:
      throw new Error('Invalid header level')
  }

  return HeaderComp
}

interface TextToSlugProps {
  attr: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
}
export function textToSlug(props: TextToSlugProps) {
  const {attr} = props
  const text = typeof attr.children === 'string' ? attr.children : ''
  const slug = text.toLowerCase().replaceAll(' ', '-')
  return slug
}
