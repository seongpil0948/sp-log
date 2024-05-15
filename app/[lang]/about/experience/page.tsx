import {AbsoluteFooter} from '@/components/server-only/footers'
import commonConfig from '@/config'
import type {TAvailLocale} from '@/config'
import {paragraph, title} from '@/config/variants/primitives'
import {hrCls} from '@/mdx-components'

import {Card, CardBody} from '@nextui-org/card'
import clsx from 'clsx'

import {docsSectionCls, sectionCls} from '../../home/theme'
import LinksContent from '../_components/LinksContent'

import {experiences} from './data'
import type {Experience} from './data'

export async function generateStaticParams() {
  return commonConfig.i18n.locales.map(lang => ({lang}))
}

interface Param {
  params: {lang: TAvailLocale}
}

export default async function SSGPage({params: {lang}}: Param) {
  return (
    <div className="max-h-screen overflow-auto">
      <ExpPage />
      <Card>
        <CardBody>
          <section className={sectionCls}>
            <LinksContent isText={true} />
          </section>
        </CardBody>
      </Card>
      <AbsoluteFooter disableDarkMode goHome disableText />
    </div>
  )
}
function ExpPage() {
  return (
    <div className={clsx(sectionCls, docsSectionCls)}>
      <h1 className={clsx(title({size: 'lg'}))}>Experience</h1>
      <div className={clsx('divide-y divide-gray-200 flex flex-col gap-6 md:gap-12')}>
        {experiences.map((e, i) => {
          return <ExperienceCard key={`experience-${i}`} e={e} />
        })}
      </div>
    </div>
  )
}

function ExperienceCard(props: {e: Experience}) {
  const {e} = props
  const subtitleCls = clsx(title({size: 'xs'}))
  return (
    <div className={clsx()}>
      <h2 className={subtitleCls}>Challenges</h2>
      <div>
        <Paragraphs ps={e.challenges} name="challenges" />
      </div>
      <h2 className={subtitleCls}>Solutions</h2>
      <div>
        <Paragraphs ps={e.solutions} name="solutions" />
      </div>
      <h2 className={subtitleCls}>Achieves</h2>
      <div>
        <Paragraphs ps={e.achieves} name="achieve" />
      </div>
      <div className={hrCls}></div>
    </div>
  )
}

function Paragraphs(props: {ps: string[]; name: string}) {
  return (
    <div>
      {props.ps.map((p, i) => {
        return (
          <div
            className={clsx(
              paragraph({
                block: true,
                size: 'xs',
              }),
              'w-[50vw] text-wrap',
            )}
            key={`${props.name}-${i}`}
          >
            {p}
          </div>
        )
      })}
    </div>
  )
}
