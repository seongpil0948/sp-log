'use client'

import { Profiler, lazy, useDeferredValue, useRef } from 'react'

import clsx from 'clsx'
import { MotionConfig, useScroll, useSpring, useVelocity } from 'framer-motion'


import SingletonHome from '../_utils/singleton'
import { sectionCls } from '../theme'

import { AboutSection } from './AboutSection'
import BlackBall from './BlackBall'
import { FirstSection } from './FirstSection'

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

const  ProjectSection = lazy(() => import('./ProjectSection'))
const LinksContent  = lazy(() => import('../../about/_components/LinksContent'))


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
  inst.scrollY = useDeferredValue(scrollY)

  return (
    <MotionConfig transition={{type: 'tween', duration: 0.5}}>
      <section
        id="scene"
        ref={rootRef}
        className={clsx(
          sectionCls,
          // "relative snap-both snap-mandatory overflow-auto"
          'relative max-h-screen overflow-y-auto overflow-x-clip',
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
        <AboutSection sectionCls={sectionCls}>
          <LinksContent />
        </AboutSection>
        {/* <DocsSection /> */}
      </section>
      <BlackBall />
    </MotionConfig>
  )
}
