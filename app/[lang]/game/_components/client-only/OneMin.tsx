'use client'
import React from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import commonConfig from '@/config'
import CharacterDefault from '@/components/client-only/three-d/gltf/char-default'

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
