import {BasicCarousel} from '@/components/client-only/Carousel'
import themeList from '@/config/variants/list'
import {main, paragraph, title, typo} from '@/config/variants/primitives'

import {Chip} from '@nextui-org/chip'
import {Image} from '@nextui-org/image'
import {Link} from '@nextui-org/link'
import clsx from 'clsx'

import {ProjectTypeIcon, ProjectUsing} from '../_components/server-only/icons'
import type {IProject} from '../types'

export function ProjectContent(props: {post: IProject}) {
  const {post} = props
  const {ul: ulClasses, ol: olClasses} = themeList()
  const roles = [...(post?.roleDetail ?? []), post?.myRole]
  return (
    <div className={clsx(main({justify: 'start', size: 'lg'}), typo({font: 'gothic'}), 'px-8 mt-4 mb-8 text-start')}>
      <h1 className={title()}>{post.title}</h1>
      {post.titleImg && <Image alt="title Image" src={post.titleImg} />}
      {post.description &&
        post.description.map((desc, idx) => (
          <p
            key={idx}
            className={paragraph({
              block: true,
            })}
          >
            {desc}
          </p>
        ))}
      <div className="flex justify-start gap-4">
        <ProjectTypeIcon projType={post.projType} size={2} />
        <ProjectUsing p={post} size={2} />
      </div>

      <h3 className={title({size: 'sm'})}> My Role </h3>
      <div className="flex gap-3 overflow-x-auto">
        {roles.map(r => (
          <Chip variant="bordered" key={r} className={typo({size: 'sm', weight: 'bold'})}>
            {r}
          </Chip>
        ))}
      </div>
      <h3 className={title({size: 'sm'})}> Tools </h3>
      <div className="flex gap-3 overflow-x-auto">
        {post.usingDetail.map(r => (
          <Chip variant="faded" color="secondary" key={r} className={typo({size: 'sm', weight: 'bold'})}>
            {r}
          </Chip>
        ))}
      </div>
      <h3 className={title({size: 'sm'})}> 해결한 주요 이슈 </h3>
      <ul className={ulClasses()}>
        {post.earned.map((desc, idx) => (
          <li key={idx} className={paragraph({size: 'md', block: true})}>
            {desc}
          </li>
        ))}
      </ul>

      {post.allImg && (
        <>
          <h3 className={title({size: 'sm'})}> 모든 이미지 </h3>
          <BasicCarousel urls={post.allImg} />
        </>
      )}
      {post.to && (
        <>
          <h3 className={title({size: 'sm'})}> 외부 링크 </h3>
          <Link href={post.to} target="_blank" color="primary" isExternal>
            {post.to}
          </Link>
        </>
      )}
    </div>
  )
}

export default ProjectContent
