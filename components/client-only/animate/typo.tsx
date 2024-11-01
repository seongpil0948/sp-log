'use client'
import {motion} from 'framer-motion'

import type {ReactNode} from 'react'


export function AnimateBlink(props: {children: ReactNode}) {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0.4},
        visible: {opacity: 1},
      }}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.9,
        repeat: Infinity,
        repeatType: 'reverse',
        type: 'tween',
        ease: 'easeOut',
      }}
    >
      {props.children}
    </motion.div>
  )
}
