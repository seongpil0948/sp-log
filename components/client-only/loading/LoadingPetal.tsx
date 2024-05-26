'use client'
import {useEffect, useRef} from 'react'

import {motion, useMotionValue} from 'framer-motion'

const ANIMATE_INTERVAL = 500
const UNIT_INCREASE_ANGLE = 0.1
const RADIUS = 50
const INITIAL_K_VALUE = 1
const K_MODULO_VALUE = 12
const ROTATION_DEGREES = 360

function projPolarToCartesian(r: number, theta: number) {
  return {
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
  }
}

export function LoadingPetal() {
  const frequency = useMotionValue(INITIAL_K_VALUE)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return console.error('Failed to get 2D context')
    frequency.set((frequency.get() % K_MODULO_VALUE) + 1)
    console.log('frequency', frequency.get())
    // k.set((k.get() % K_MODULO_VALUE) + INITIAL_K_VALUE);
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const getSinFuncXY = (theta: number) => {
      const {x, y} = projPolarToCartesian(RADIUS, theta)
      const sx = centerX + x * Math.sin(frequency.get() * theta)
      const sy = centerY + y * Math.sin(frequency.get() * theta)
      return {sx, sy}
    }

    const drawSinFunc = (theta: number) => {
      const {sx, sy} = getSinFuncXY(theta)
      ctx.lineTo(sx, sy)
      ctx.strokeStyle = 'white'
      ctx.stroke()
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    for (let theta = 0; theta < 2 * Math.PI; theta += UNIT_INCREASE_ANGLE) {
      drawSinFunc(theta)
    }
  }

  const animateId = useRef<number>()
  const lastTime = useRef<number>(new Date().getTime())
  useEffect(() => {
    const animateFrame = (time: DOMHighResTimeStamp) => {
      animate()
      if (time - lastTime.current < ANIMATE_INTERVAL) {
        animateId.current = requestAnimationFrame(animateFrame)
        return
      }
      lastTime.current = time
      // animateId.current = requestAnimationFrame(animateFrame)
    }
    animateFrame(new Date().getTime())

    return () => {
      if (animateId.current) cancelAnimationFrame(animateId.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{rotate: 0}}
      animate={{
        rotate: ROTATION_DEGREES,
        transition: {
          duration: 0.01,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'smooth',
          // bounceStiffness: 0,
          type: 'spring',
          stiffness: 200,
          damping: 10,
        },
      }}
      style={{
        width: '100%',
        height: '100%',
      }}
      // viewBox="0 0 600 600"
      // initial="hidden"
      // animate="visible"
    >
      {/* <motion.circle
        cx={150}
        cy={150}
        r={100}
        stroke="white"
        strokeWidth={2}
        style={{
          x: angle * Math.cos(angle),
          y: angle * Math.sin(angle),
        }}
      /> */}
    </motion.canvas>
  )
}
