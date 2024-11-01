/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-unknown-property */
import {useRef, useLayoutEffect} from 'react'

import {Canvas, useThree} from '@react-three/fiber'
import {MotionConfig} from 'framer-motion'
import {motion} from 'framer-motion-3d'

import {useSmoothTransform} from '../use-smooth-transform'

export const transition = {
  type: 'spring',
  duration: 0.7,
  bounce: 0.2,
}

export function BasicShape({isHover, isPress, mouseX, mouseY}: any) {
  const lightRotateX = useSmoothTransform(mouseY, spring, mouseToLightRotation)
  const lightRotateY = useSmoothTransform(mouseX, spring, mouseToLightRotation)

  return (
    <Canvas shadows dpr={[1, 2]} resize={{scroll: false, offsetSize: true}}>
      <Camera mouseX={mouseX} mouseY={mouseY} />
      <MotionConfig transition={transition}>
        <motion.group
          // center={[0, 0, 0]}
          rotation={[lightRotateX, lightRotateY, 0]}
        >
          <Lights />
        </motion.group>
        <motion.group
          initial={false}
          animate={isHover ? 'hover' : 'rest'}
          dispose={null}
          variants={{
            hover: {z: isPress ? -0.9 : 0},
          }}
        >
          <Sphere />
          <Cone />
          <Torus />
          <Icosahedron />
        </motion.group>
      </MotionConfig>
    </Canvas>
  )
}

export function Lights() {
  return (
    <>
      <spotLight color="#61dafb" position={[-10, -10, -10]} intensity={200} />
      <spotLight color="#61dafb" position={[-10, 0, 15]} intensity={30} />
      <spotLight color="#61dafb" position={[-5, 20, 2]} intensity={80} />
      <spotLight color="#f2056f" position={[15, 10, -2]} intensity={200} />
      <spotLight color="#f2056f" position={[15, 10, 5]} intensity={80} />
      <spotLight color="#b107db" position={[5, -10, 5]} intensity={200} />
    </>
  )
}

export function Sphere() {
  return (
    <motion.mesh position={[-0.5, -0.5, 0]} variants={{hover: {z: 2}}}>
      <sphereGeometry args={[0.4]} />
      <Material />
    </motion.mesh>
  )
}

export function Cone() {
  return (
    <motion.mesh
      position={[-0.8, 0.4, 0]}
      rotation={[-0.5, 0, -0.3]}
      variants={{
        hover: {
          z: 1.1,
          x: -1.5,
          rotateX: -0.2,
          rotateZ: 0.4,
        },
      }}
    >
      <coneGeometry args={[0.3, 0.6, 20]} />
      <Material />
    </motion.mesh>
  )
}

export function Torus() {
  return (
    <motion.mesh
      position={[0.1, 0.4, 0]}
      rotation={[-0.5, 0.5, 0]}
      variants={{
        hover: {
          y: 0.5,
          z: 2,
          rotateY: -0.2,
        },
      }}
    >
      <torusGeometry args={[0.2, 0.1, 10, 50]} />
      <Material />
    </motion.mesh>
  )
}

export function Icosahedron() {
  return (
    <motion.mesh
      position={[1.1, 0, 0]}
      rotation-z={0.5}
      variants={{
        hover: {
          x: 1.8,
          z: 0.6,
          y: 0.6,
          rotateZ: -0.5,
        },
      }}
    >
      <icosahedronGeometry args={[0.7, 0]} />
      <Material />
    </motion.mesh>
  )
}

export function Material() {
  return <meshPhongMaterial color="#fff" specular="#61dafb" shininess={10} />
}

// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/PerspectiveCamera.tsx
function Camera({mouseX, mouseY, ...props}: any) {
  const cameraX = useSmoothTransform(mouseX, spring, (x: any) => x / 350)
  const cameraY = useSmoothTransform(mouseY, spring, (y: any) => (-1 * y) / 350)

  const set = useThree(({set}) => set)
  const camera = useThree(({camera}) => camera)
  const size = useThree(({size}) => size)
  const scene = useThree(({scene}) => scene)
  const cameraRef = useRef()

  useLayoutEffect(() => {
    const {current: cam} = cameraRef
    if (cam) {
      ;(cam as any).aspect = size.width / size.height
      ;(cam as any).updateProjectionMatrix()
    }
  }, [size, props])

  useLayoutEffect(() => {
    if (cameraRef.current) {
      const oldCam = camera
      set(() => ({camera: cameraRef.current}) as any)
      return () => set(() => ({camera: oldCam}))
    }
  }, [camera, cameraRef, set])

  useLayoutEffect(() => {
    const unsubscribeX = cameraX.on('change', () => camera.lookAt(scene.position))

    return () => {
      unsubscribeX()
    }
  }, [cameraX, camera, scene.position])

  return <motion.perspectiveCamera ref={cameraRef as any} fov={90} position={[cameraX, cameraY, 3.8]} />
}

const spring = {stiffness: 600, damping: 30}

const mouseToLightRotation = (v: any) => (-1 * v) / 140
