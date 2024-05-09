import { Image } from '@nextui-org/image'
import { mdiApple, mdiAndroid, mdiWeb } from '@mdi/js'
import Icon from '@mdi/react'
import { IProject, TProjType } from '../../types'

export function ProjectUsing(props: { p: IProject; size?: number }) {
  const { p } = props
  const size = props.size ?? 1

  return (
    <div className="flex gap-2">
      {p.using.map((icon, i) =>
        p.usingPubIdx?.includes(i) ? (
          <Image
            key={p.title + icon}
            width={30}
            alt={'icon using project'}
            src={icon}
          />
        ) : (
          <Icon key={p.title + icon} path={icon} size={size} />
        ),
      )}
    </div>
  )
}

export function ProjectTypeIcon(p: { projType: TProjType; size?: number }) {
  const size = p.size ?? 1
  if (p.projType === 'webApp')
    return (
      <div className="flex min-w-unit-12 justify-around">
        <Icon path={mdiWeb} size={size} />
        <Icon path={mdiApple} size={size} />
        <Icon path={mdiAndroid} size={size} />
      </div>
    )
  else if (p.projType === 'app')
    return (
      <div className="flex min-w-unit-12 justify-around">
        <Icon path={mdiApple} size={size} />
        <Icon path={mdiAndroid} size={size} />
      </div>
    )
  else return <Icon path={mdiWeb} size={size} />
}
