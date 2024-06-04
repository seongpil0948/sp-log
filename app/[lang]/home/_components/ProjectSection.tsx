'use client'
import { wrap } from '@/app/_utils/client/motion'
import { title } from '@/config/variants/primitives'
import { useMemo, useRef } from 'react'


import clsx from 'clsx'
import { motion, useAnimationFrame, useInView, useMotionValue, useTransform } from 'framer-motion'


import ProjectCardListHorizontal from '../../project/_components/server-only/ProjectCardsHorizontal'
import PROJECTS from '../../project/_logics/projects'
import SingletonHome from '../_utils/singleton'
import { sectionCls } from '../theme'

import type { MotionValue } from 'framer-motion'
import type { ReactNode } from 'react'

export function ProjectSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const {data} = SingletonHome.getInstance()

  // const arrProjects = splitArray(PROJECTS, 2);
  const ParallaxProjects = useMemo(() => {
    return [PROJECTS].map((projects, idx) => (
        <ParallaxText key={idx} scrollY={data} containerRef={sectionRef} baseVelocity={idx % 2 === 0 ? 10 : -10}>
          <ProjectCardListHorizontal key={idx} projects={projects} />
        </ParallaxText>
      ))
  }, [data])


  return (
    <section ref={sectionRef} className={clsx(sectionCls, '-mt-48')}>
      <ParallaxText scrollY={data} containerRef={sectionRef} baseVelocity={-10}>
        Projects
      </ParallaxText>
      {ParallaxProjects}
    </section>
  )
}

interface ParallaxProps {
  children: ReactNode
  baseVelocity: number
  containerRef?: React.RefObject<HTMLDivElement>
  scrollY: MotionValue<number>
}

export function ParallaxText(props: ParallaxProps) {
  const {baseVelocity, children, scrollY} = props
  const baseX = useMotionValue(0)
  const velocityFactor = useTransform(scrollY, [0, 1000], [0, 10], {
    clamp: false,
  })
  const inView = useInView(props.containerRef!, {
    amount: 0.2,
  })
  const x = useTransform(baseX, v => `${wrap(-480, 80, v)}%`)
  const directionFactor = useRef<number>(1)

  useAnimationFrame((_t, delta) => {
    if (!inView) return
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
      /**
       * This is what changes the direction of the scroll once we
       * switch scrolling directions.
       */
      if (velocityFactor.get() < 0) {
        directionFactor.current = -1
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1
      }
      moveBy += directionFactor.current * moveBy * velocityFactor.get()
      baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="whitespace-nowrap flex flex-nowrap">
      <motion.div className={clsx(title({font: 'script'}), 'flex whitespace-nowrap flex-nowrap gap-12 ')} style={{x}}>
        <span>{children} </span>
        <span>{children} </span>

        {new Array(10).fill(0).map((_, idx) => (
          <motion.span
            key={idx}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 2, delay: idx * 1}}
          >
            {children}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

export default ProjectSection