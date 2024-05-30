/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-unknown-property */
'use client'
import CharacterDefault from '@/components/client-only/three-d/gltf/char-default'
import commonConfig from '@/config'

import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

const ComputersCanvas = () => {
  return (
    <Canvas>
      <ambientLight />
      <CharacterDefault />
      <gridHelper args={[10, 10]} />
      <axesHelper args={[5]} />
      <OrbitControls />
      <orthographicCamera position={[0, 5, 5]} zoom={5} />
    </Canvas>
  )
}

export default ComputersCanvas

useGLTF.preload(commonConfig.game.character.default)
