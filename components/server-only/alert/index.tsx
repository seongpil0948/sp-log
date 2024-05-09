import type { ReactNode } from 'react'
import alertTheme from './theme'
import {
  mdiAlertCircle,
  mdiInformation,
  mdiAlert,
  mdiCloseCircle,
} from '@mdi/js'
import Icon from '@mdi/react'

interface AlertTextProps {
  title?: string
  children: ReactNode
  color?: 'info' | 'warn' | 'error' | 'default'
}
export function AlertText(props: AlertTextProps) {
  const {
    wrapper,
    icon,
    textWrapper,
    title: alertTitle,
    content,
  } = alertTheme({
    color: props.color,
  })

  return (
    <div className={wrapper()}>
      <Icon path={getIcon(props.color)} size={1} className={icon()} />
      <div className={textWrapper()}>
        {props.title && <div className={alertTitle()}>{props.title}</div>}
        <div className={content()}>{props.children}</div>
      </div>
    </div>
  )
}

function getIcon(variant: AlertTextProps['color']) {
  switch (variant) {
    case 'info':
      return mdiInformation
    case 'warn':
      return mdiAlert
    case 'error':
      return mdiCloseCircle
    default:
      return mdiAlertCircle
  }
}
