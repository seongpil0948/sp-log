'use client'
import useThrottle from '@/app/_utils/client/hooks/throttle'
import { wrap } from '@/app/_utils/client/motion'
import { title } from '@/config/variants/primitives'
import { startTransition, useCallback, useEffect, useMemo, useRef } from 'react'

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
        <ParallaxText numOfChildren={1} key={idx} scrollY={data} containerRef={sectionRef} baseVelocity={idx % 2 === 0 ? 10 : -10}>
          <ProjectCardListHorizontal key={idx} projects={projects} />
        </ParallaxText>
      ))
  }, [data])


  return (
    <section ref={sectionRef} className={clsx(sectionCls, '-mt-48')}>
      <ParallaxText numOfChildren={50} scrollY={data} containerRef={sectionRef} baseVelocity={-10}>
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
  numOfChildren: number
  totalWidth?: number
}

export function ParallaxText(props: ParallaxProps) {
  const {baseVelocity, children, scrollY, numOfChildren} = props
  const totalWidth = props.totalWidth || 250
  // const velocityFactor = useTransform(scrollY, [0, 1000], [1, 30], {
  //   clamp: false,
  //   ease: cubicBezier(0.5, 0, 0.5, 1)
  // })
  const inView = useInView(props.containerRef!, {
    amount: 0.2,
  })
  const directionFactor = useRef<number>(1)
  const initialTranslateX = directionFactor.current < 0? totalWidth : -totalWidth
  const baseX = useMotionValue(initialTranslateX)
  const x = useTransform(baseX, v => {
    const resultX = `${wrap(initialTranslateX * 2,-initialTranslateX / 2, v)}%`
    return resultX
  })
  
const calculateMoveBy = useCallback((delta: number) => {
  const moveBy = directionFactor.current * baseVelocity * (delta / 500)
  // console.log('moveBy: ', {moveBy, baseVelocity, delta})
  return moveBy
}, [baseVelocity]);

const updateDirection = useCallback((v: number) => {
  console.debug('scrollY: ', v)
  directionFactor.current = v < 0  ? -1 : 1;
}, [])
const throttledChangeHandler = useThrottle(updateDirection, 500);

useEffect(() => {
  const unsubscribe = scrollY.on('change', throttledChangeHandler);
  return () => {
    unsubscribe();
  }
}, [scrollY, throttledChangeHandler]);

  

  useAnimationFrame((_t, delta) => {
    if (!inView) return
    startTransition(() => {
      const moveBy = calculateMoveBy(delta)
      baseX.set(baseX.get() + moveBy)
    })
  })

  return (
      <motion.div className={clsx(title({font: 'script'}), 'whitespace-nowrap flex flex-nowrap gap-12 ')} style={{x, willChange: 'transform'}}>
        {new Array(numOfChildren).fill(0).map((_, idx) => (
          <motion.span
            key={idx}
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            viewport={{once: true}}
            transition={{duration: 1, delay: idx * 0.05}}
          >
            {children}
          </motion.span>
        ))}
      </motion.div>
  )
}

export default ProjectSection


