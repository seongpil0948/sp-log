"use client";
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig, MotionValue, motion } from "framer-motion";
import { MotionCanvas, motion as motion3d } from "framer-motion-3d";
import { OrbitControls } from "@react-three/drei";
import { BufferGeometry, Mesh, SphereGeometry } from "three";

const Sphere = (props?: { speed?: MotionValue<number> }) => {
  const meshRef = useRef<Mesh>(null!);
  useEffect(() => {
    console.log(meshRef.current);
    const randomArray: number[] = [];
    const geoRef = meshRef.current.geometry as SphereGeometry;
    const positionArray = geoRef.attributes.position.array;
    for (let i = 0; i < positionArray.length; i += 3) {
      // 정점(Vertex) 한 개의 x, y, z 좌표를 랜덤으로 조정
      positionArray[i] += (Math.random() - 0.5) * 0.2;
      positionArray[i + 1] += (Math.random() - 0.5) * 0.2;
      positionArray[i + 2] += (Math.random() - 0.5) * 0.2;

      randomArray[i] = (Math.random() - 0.5) * 0.2;
      randomArray[i + 1] = (Math.random() - 0.5) * 0.2;
      randomArray[i + 2] = (Math.random() - 0.5) * 0.2;
    }
    geoRef.userData.randomArray = randomArray;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const speed = props?.speed ? props.speed.get() : 1;
    const geoRef = meshRef.current.geometry as SphereGeometry;
    const randomArray = geoRef.userData.randomArray;
    const positionArray = geoRef.attributes.position.array;
    if (geoRef.userData.randomArray.length !== positionArray.length)
      return console.error("length not matched");
    const time = state.clock.getElapsedTime() * speed;

    for (let i = 0; i < positionArray.length; i += 3) {
      positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001;
      positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.001;
      positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.001;
    }
    geoRef.rotateX(0.001 * speed);
    geoRef.rotateY(0.001 * speed);
    geoRef.attributes.position.needsUpdate = true;
  });
  return (
    <mesh ref={meshRef}>
      {/* infinite rotation */}
      <motion3d.sphereGeometry
        args={[1, 24, 24]}
        // animate={{ rotateX: 1 }}
        // transition={{ duration: 0.1, repeat: Infinity }}
      />
      <meshStandardMaterial
        color="hsl(240, 5.03%, 64.9%)"
        side={2 /* DoubleSide */}
        flatShading
      />
    </mesh>
  );
};

export const BlackBall = (props: { speed: MotionValue<number> }) => {
  return (
    <MotionConfig transition={{ type: "spring" }}>
      <motion.div
        className=" fixed top-0 left-0 w-screen h-screen -z-2"
        animate={{ scale: 2 }}
      >
        <MotionCanvas>
          {/* <pointLight color={"red"} position={[15, 15, 15]} /> */}
          <ambientLight color="hsl(240, 5.03%, 64.9%)" intensity={0.01} />
          <directionalLight
            color="hsl(240, 5.03%, 64.9%)"
            position={[1, 0, 5]}
            intensity={1}
          />
          <OrbitControls />
          <Sphere speed={props.speed} />
        </MotionCanvas>
      </motion.div>
    </MotionConfig>
  );
};

export default BlackBall;
