'use client'

import { subtitle } from '@/config/variants/primitives'
import { Profiler, useRef } from 'react'

import clsx from 'clsx'
import { MotionConfig, useScroll, useSpring, useVelocity } from 'framer-motion'

import LinksContent from '../../about/_components/LinksContent'
import SingletonHome from '../_utils/singleton'
import { sectionCls } from '../theme'

import BlackBall from './BlackBall'
import { FirstSection } from './FirstSection'
import { ProjectSection } from './ProjectSection'

import type { ProfilerOnRenderCallback } from 'react'


const printOnRender: ProfilerOnRenderCallback = (id, phase, durationActual, durationBase, startTime, commitTime) => {
  console.debug({
    id,
    phase,
    durationActual,
    durationBase,
    startTime,
    commitTime,
  })
}

// on first mounted disable scroll and rotate the image
// when frame is equal to length of urls, enable scroll
export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const {scrollY} = useScroll({
    container: rootRef,
    layoutEffect: true,
  })

  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const inst = SingletonHome.getInstance()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  inst.setData(smoothVelocity)
  inst.scrollY = scrollY

  return (
    <MotionConfig transition={{type: 'tween', duration: 0.5}}>
      <section
        id="scene"
        ref={rootRef}
        className={clsx(
          sectionCls,
          // "relative snap-both snap-mandatory overflow-auto"
          'relative overflow-auto max-h-screen',
        )}
        style={{
          zIndex: 1,
        }}
      >
         <Profiler id="FirstSection" onRender={printOnRender}>
          <FirstSection />  
        </Profiler>
        <Profiler id="ProjectSection" onRender={printOnRender}>
          <ProjectSection />
        </Profiler>
        <AboutSection />
        {/* <DocsSection /> */}
      </section>
      <BlackBall />
    </MotionConfig>
  )
}

export function AboutSection() {
  return (
    <section className={clsx(sectionCls, 'pl-4')}>
      <div className={subtitle({color: 'gray'})}>사이트 개발자에대해 궁금한가요?</div>
      <div className=" w-1/2 mr-auto !text-start mb-6  ">
        <LinksContent isText />
      </div>
    </section>
  )
}
