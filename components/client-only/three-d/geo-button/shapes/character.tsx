/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {useRef, useLayoutEffect} from 'react'

import {Canvas, useThree} from '@react-three/fiber'
import {MotionConfig} from 'framer-motion'
import {motion} from 'framer-motion-3d'

import CharacterDefault from '../../gltf/char-default'
import {useSmoothTransform} from '../use-smooth-transform'

const transition = {
  type: 'spring',
  duration: 0.7,
  bounce: 0.2,
}

export function CharacterShape({isHover, isPress, mouseX, mouseY}: any) {
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
            hover: {
              z: isPress ? -0.9 : 0,
              x: isPress ? -2.9 : 0,
            },
          }}
        >
          <CharacterDefault />
        </motion.group>
      </MotionConfig>
    </Canvas>
  )
}

function Lights() {
  return (
    <>
      <spotLight color="yellow" position={[-1, 2, 1]} intensity={100} />
    </>
  )
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
