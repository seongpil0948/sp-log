import { ButtonAll } from '@/components/client-only/button/links'
import { HeaderAbout } from './Header'
import clsx from 'clsx'
import { ExperienceDownButton } from '../experience/_components/DownloadButton'

export function LinksContent(props: { isText?: boolean }) {
  return (
    <>
      <HeaderAbout title="Links" />
      <div
        className={clsx('flex flex-wrap gap-2 md:gap-4  h-full ', {
          'items-center': !props.isText,
        })}
      >
        {...ButtonAll({ isText: props.isText })}
        <ExperienceDownButton />
      </div>
    </>
  )
}

export default LinksContent
