// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-unknown-property */
/*
This file was generated by https://github.com/pmndrs/gltfjsx and then
customized manually. It uses drei's new useAnimations hook which extracts
all actions and sets up a THREE.AnimationMixer for it so that you don't have to.
All of the assets actions, action-names and clips are available in its output. 
*/

import { useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useEffect, useRef, useState } from 'react'

export default function Model(props) {
  const halo = useRef()
  // Fetch model and a separate texture
  const texture = useTexture('/stacy.jpg')
  const {nodes, animations} = useGLTF('/stacy.glb')
  // Extract animation actions
  const {ref, actions, names} = useAnimations(animations)
  // Hover and animation-index states
  const [hovered, setHovered] = useState(false)
  const [index, setIndex] = useState(4)

  // Change cursor on hover-state
  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])

  // Change animation when the index changes
  useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]].reset().fadeIn(0.5).play()
    // In the clean-up phase, fade it out
    return () => actions[names[index]].fadeOut(0.5)
  }, [index, actions, names])

  useFrame((state, delta) => {
    // Animate the selection halo
    easing.damp3(halo.current.scale, hovered ? 1.15 : 1, 0.2, delta)
    easing.dampC(halo.current.material.color, hovered ? 'hotpink' : 'aquamarine', 0.2, delta)
  })

  return (
    <group ref={ref} {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          castShadow
          receiveShadow
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setIndex((index + 1) % names.length)}
          geometry={nodes.stacy.geometry}
          skeleton={nodes.stacy.skeleton}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        >
          <meshStandardMaterial map={texture} map-flipY={false} skinning />
        </skinnedMesh>
      </group>
      <mesh ref={halo} receiveShadow position={[0, 1, -1]}>
        <circleGeometry args={[1, 64]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  )
}
