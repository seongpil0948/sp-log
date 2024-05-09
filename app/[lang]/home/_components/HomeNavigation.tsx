'use client'
import GeoButton from '@/components/client-only/three-d/geo-button'
import { paragraph } from '@/config/variants/primitives'
import { motion } from 'framer-motion'

const menuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}
const ulVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const itemIds = [0, 1]
export const HomeNavigation = () => (
  <motion.ul
    variants={ulVariants}
    style={{
      maxWidth: '30vw',
      maxHeight: '40vh',
    }}
  >
    {itemIds.map(i => (
      <MenuItem i={i} key={i} />
    ))}
  </motion.ul>
)
// const MenuItem = ({ i, children }: { i: number; children?: ReactNode }) => {
const MenuItem = ({ i }: { i: number }) => {
  return (
    <motion.li
      key={i}
      variants={menuItemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        listStyle: 'none',
        marginBottom: '8rem',
        width: '100%',
        height: '100%',
        color: 'white',
      }}
    >
      {/* {children ?? "hi"} */}
      {i === 0 ? (
        <GeoButton shape="basic" href="/docs">
          <p className={paragraph({ color: 'white' })}>DOCS</p>
        </GeoButton>
      ) : (
        <GeoButton shape="character" href="/game">
          <p className={paragraph({ color: 'white' })}>GAME</p>
        </GeoButton>
      )}
    </motion.li>
  )
}

export default HomeNavigation
