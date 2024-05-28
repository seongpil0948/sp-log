import {LINKS_MAP} from '@/config/site'
import {paragraph} from '@/config/variants/primitives'

import {Button} from '@nextui-org/button'
import {Link} from '@nextui-org/link'
import clsx from 'clsx'

import type {ButtonProps} from '@nextui-org/button'

const BTN_PROPS: ButtonProps = {
  as: Link,
  color: 'default',
  size: 'lg',
  className: clsx(paragraph({size: 'md'}), 'w-60 inline-flex'),
  variant: 'bordered',
}
interface BtnProps {
  isText?: boolean
}

export function ButtonFactory(props: {id: keyof typeof LINKS_MAP; isText?: boolean}) {
  const link = LINKS_MAP[props.id]
  if (props.isText)
    return (
      <Link href={link.href} isExternal size={BTN_PROPS.size} color="primary">
        {link.href}
      </Link>
    )
  return (
    <Button {...(BTN_PROPS as any)} href={link.href} showAnchorIcon startContent={link.icon}>
      {link.label.ko}
    </Button>
  )
}

export const ButtonGithub = (props: BtnProps) => ButtonFactory({id: 'github', isText: props.isText})
export const ButtonLinkedIn = (props: BtnProps) => ButtonFactory({id: 'linkedIn', isText: props.isText})
export const ButtonHome = (props: BtnProps) => ButtonFactory({id: 'home', isText: props.isText})
export const ButtonCodingGame = (props: BtnProps) => ButtonFactory({id: 'codingGame', isText: props.isText})

export const ButtonAll = (props: BtnProps) => {
  return Object.keys(LINKS_MAP).map((key, idx) => (
    <ButtonFactory key={`link-btn-${idx}`} id={key as keyof typeof LINKS_MAP} isText={props.isText} />
  ))
}
