// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unknown-property */
import commonConfig from '@/config'
import { useEffect, useState } from 'react'

import { useAnimations } from '@react-three/drei'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const CharacterDefault = ({isMobile = false}) => {
  const gltf = useLoader(GLTFLoader, commonConfig.game.character.default)
  const {ref, actions, names, mixer} = useAnimations(gltf.animations)
  const [index] = useState(0)
  useFrame((_state, delta) => {
    mixer.update(delta * 0.5)
  })

  // Change animation when the index changes
  useEffect((): any => {
    if (!actions[names[index]]) return
    // Reset and fade in animation after an index has been changed
    actions[names[index]]!.reset().fadeIn(0.5).play()
    // In the clean-up phase, fade it out
    return () => actions[names[index]]?.fadeOut(0.5).stop()
  }, [index, actions, names])

  return (
    <group>
      <primitive
        scale={isMobile ? 0.7 : 0.75}
        position={[0, 0, 3]}
        // rotation={[-0.01, -0.2, -0.1]}
        object={gltf.scene}
        ref={ref}
        dispose={null}
      />
    </group>
  )
}

export default CharacterDefault
