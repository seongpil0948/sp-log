// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unknown-property */
'use client'
import { useEffect, useRef, useState, useTransition } from 'react'

import { Float, Stars } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import { MotionCanvas, motion as motion3d } from 'framer-motion-3d'
// import {EllipseCurve, Color} from 'three'

import SingletonHome from '../_utils/singleton'

import type { Group, Mesh, SphereGeometry } from 'three'


// https://codesandbox.io/embed/xzi6ps?codemirror=1
// https://codesandbox.io/p/sandbox/bezier-curves-nodes-3k4g6?file=%2Fsrc%2FNodes.js

const variants = {
  toCenter: {
    x: 0,
    y: 0,
    scale: 1,
  },
  toRightBottom: {
    x: 3.5,
    y: -2.5,
    scale: 0.5,
  },
}
type VariantLabel = keyof typeof variants
const Sphere = () => {
  const meshRef = useRef<Mesh>(null!)
  const groupRef = useRef<Group>(null!)
  const inst = SingletonHome.getInstance()
  const [currAnimation, setCurrAnimation] = useState<VariantLabel>('toCenter')
  const [_isPending, startTransition] = useTransition();

  useEffect(() => {
    const randomArray: number[] = []
    const geoRef = meshRef.current.geometry as SphereGeometry
    const positionArray = geoRef.attributes.position.array

    for (let i = 0; i < positionArray.length; i += 3) {
      // 정점(Vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
      positionArray[i] += (Math.random() - 0.5) * 0.2
      positionArray[i + 1] += (Math.random() - 0.5) * 0.2
      positionArray[i + 2] += (Math.random() - 0.5) * 0.2

      randomArray[i] = (Math.random() - 0.5) * 0.2
      randomArray[i + 1] = (Math.random() - 0.5) * 0.2
      randomArray[i + 2] = (Math.random() - 0.5) * 0.2
    }
    geoRef.userData.randomArray = randomArray
  }, [])

  useFrame(state => {
    if (!meshRef.current?.geometry.userData.randomArray) return
    const speed = inst.data.get()
    const geoRef = meshRef.current.geometry as SphereGeometry
    const randomArray = geoRef.userData.randomArray
    const positionArray = geoRef.attributes.position.array
    if (geoRef.userData.randomArray.length !== positionArray.length) return console.error('length not matched')
    const time = state.clock.getElapsedTime()
    startTransition(() => {

      for (let i = 0; i < positionArray.length; i += 3) {
        positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001
        positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.001
        positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.001
      }
      geoRef.rotateX(0.001 * speed)
      geoRef.rotateY(0.001 * speed)
  
      geoRef.attributes.position.needsUpdate = true
      if (inst.scrollY.get() > 200 && currAnimation !== 'toRightBottom') {
        setCurrAnimation('toRightBottom')
      } else if (inst.scrollY.get() <= 200 && currAnimation !== 'toCenter') {
        setCurrAnimation('toCenter')
      }
    })
  })

  // const points = useMemo(() => new EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), [])
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <motion3d.group
        ref={groupRef as any}
        variants={variants}
        // animate={inst.scrollY.get() > 200 ? "toRightBottom" : "toCenter"}
        animate={currAnimation}
        // transition={{ duration: 0.1, repeat: Infinity }}
      >
        {/* <Line worldUnits points={points} color="turquoise" lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="turquoise"
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      />
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, Math.PI / 3]}
        speed={6.5}
      />
      <Electron
        position={[0, 0, 0.5]}
        rotation={[0, 0, -Math.PI / 3]}
        speed={7}
      /> */}
        <mesh ref={meshRef}>
          {/* infinite rotation */}
          <motion3d.sphereGeometry
            args={[1, 24, 24]}
            // animate={{ rotateX: 1 }}
            // transition={{ duration: 0.1, repeat: Infinity }}
          />
          <meshStandardMaterial color="hsl(240, 5.03%, 64.9%)" side={2 /* DoubleSide */} flatShading />
        </mesh>
      </motion3d.group>
    </Float>
  )
}

// function Electron({radius = 2.75, speed = 6, ...props}) {
//   const ref = useRef<Mesh>(null!)
//   useFrame(state => {
//     const t = state.clock.getElapsedTime() * speed
//     ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0)
//   })
//   return (
//     <group {...props}>
//       <Trail local width={5} length={6} color={new Color(2, 5, 10)} attenuation={t => t * t}>
//         <mesh ref={ref}>
//           <sphereGeometry args={[0.25]} />
//           <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
//         </mesh>
//       </Trail>
//     </group>
//   )
// }

export const BlackBall = () => {
  const inst = SingletonHome.getInstance()
  const scrollY = inst.scrollY.get()
  console.info('scroll y: ', scrollY)
  if (scrollY > 200) {
    // geoRef.translateX(0.001 * speed);
  }
  return (
    <motion.div className=" fixed top-0 left-0 w-screen h-screen -z-2">
      <MotionCanvas>
        {/* <pointLight color={"red"} position={[15, 15, 15]} /> */}
        <ambientLight color="hsl(240, 5.03%, 64.9%)" intensity={0.01} />
        <directionalLight color="hsl(240, 5.03%, 64.9%)" position={[1, 0, 5]} intensity={1} />

        <Sphere />
        <Stars saturation={0} count={400} speed={0.5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
      </MotionCanvas>
    </motion.div>
  )
}

export default BlackBall
