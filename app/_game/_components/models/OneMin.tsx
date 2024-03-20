import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { type AnimationAction, AnimationMixer } from "three";

const MODEL_URL = "/glb/ilbuni.glb";
export default function Model(props: any) {
  const gltf = useGLTF(MODEL_URL);
  const actions: AnimationAction[] = [];
  useEffect(() => {
    gltf.scene.position.set(0, 0.3, 0);

    const mixer = new AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
      actions.push(mixer.clipAction(clip));
    });
    actions[1].play();
    console.log(actions);
  });

  return <primitive {...props} object={gltf.scene} />;
}

useGLTF.preload(MODEL_URL);
