'use client'

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { isMobile, useWindowSize } from '@/app/_utils/client/responsive'
import { useMemo, useRef } from 'react'

import clsx from 'clsx'
import { MotionConfig, motion, useInView, useTransform } from 'framer-motion'

import SingletonHome from '../_utils/singleton'
import { sectionCls } from '../theme'

import { AboutCanvas } from './AboutCanvas'
import HomeNavigation from './HomeNavigation'

export function FirstSection() {
  const {data} = SingletonHome.getInstance()
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, {
    amount: 0.9,
    margin: '64px 0px 0px 0px',
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const {windowSize: s} = useWindowSize()
  const isM = isMobile()

    const blackHole = useMemo(() => ({
    w: s.width / 2,
    h: s.height / 2,
    initial: { opacity: 0, x: 0 },
  }), [s.width, s.height])

  const toR = isM ? 2 : 5
    const animateTo = useMemo(() => {
    const toX = isM ? 0.3 : 0.8
    const toY = isM ? 0.3 : 0.8
    return {
      leftT: -(blackHole.w * toX),
      rightT: blackHole.w * toX,
      topT: -(blackHole.h * toY),
      centerVT: blackHole.h / 3,
      common: {
        opacity: 1,
      },
    }
  }, [isM, blackHole.w, blackHole.h])
  const inputRage = [0, blackHole.h / 4]
  const leftTX = useTransform(data, inputRage, [animateTo.leftT, 0])
  const rightTX = useTransform(data, inputRage, [animateTo.rightT, 0])
  const topTY = useTransform(data, inputRage, [animateTo.topT, 0])
  const opacity = useTransform(data, inputRage, [1, 0])
  const rotate = useTransform(data, inputRage, [toR, 0])

  // useMotionValueEvent(inst.data, "change", (latest) => {
  //   console.log("latest: ", latest);
  // });


  return (
    <section ref={sectionRef} className={clsx(sectionCls, 'relative')}>
      <MotionConfig transition={{duration: 0.3, type: 'just'}}>
        <motion.span
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: leftTX.get(),
            y: topTY.get(),
          }}
          style={{
            position: 'absolute',
            zIndex: 1,
            top: isM ? '25%' : '50%',
            left: isM ? '25%' : '50%',
            fontSize: '3rem',
            color: 'white',
          }}
        >
          Seongpil Dev
        </motion.span>
        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: rightTX.get(),
            y: animateTo.centerVT,
            rotate: -rotate.get(),
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <AboutCanvas
            delta={data}
            isInView={isInView}
            speed={1}
            width={blackHole.w}
            height={blackHole.h}
            canvasRef={canvasRef}
          />
        </motion.div>
        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: leftTX.get() + blackHole.w * (isM ? 0.5 : 1.1),
            rotate: -rotate.get(),
            y: blackHole.h * 0.6,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
          style={{
            width: blackHole.w,
            height: blackHole.h * 2,
          }}
        >
          <HomeNavigation />
        </motion.div>
      </MotionConfig>
    </section>
  )
}
