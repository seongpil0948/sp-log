"use client";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas, PrimitiveProps, useLoader } from "@react-three/fiber";
import { type AnimationAction, AnimationMixer } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import commonConfig from "@/config";

const Computers = ({ isMobile = false }) => {
  const gltf = useLoader(GLTFLoader, commonConfig.game.character.default);
  const { ref, actions, names } = useAnimations(gltf.animations);
  const [index, setIndex] = useState(0);
  // Change animation when the index changes
  useEffect((): any => {
    // Reset and fade in animation after an index has been changed
    actions[names[index]]?.reset().fadeIn(0.5).play();
    // In the clean-up phase, fade it out
    return () => actions[names[index]]?.fadeOut(0.5);
  }, [index, actions, names]);

  return (
    <group>
      <primitive
        scale={isMobile ? 0.7 : 0.75}
        position={[0, 0, 3]}
        // rotation={[-0.01, -0.2, -0.1]}
        object={gltf.scene}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  return (
    <Canvas>
      <ambientLight />
      <Computers />
      <gridHelper args={[10, 10]} />
      <axesHelper args={[5]} />
      <OrbitControls />
      <orthographicCamera position={[0, 5, 5]} zoom={5} />
    </Canvas>
  );
};

export default ComputersCanvas;

useGLTF.preload(commonConfig.game.character.default);
