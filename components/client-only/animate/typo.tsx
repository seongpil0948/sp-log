'use client'
import type {ReactNode} from 'react'

import {motion} from 'framer-motion'

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
