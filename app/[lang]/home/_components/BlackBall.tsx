"use client";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import { MotionCanvas, motion as motion3d } from "framer-motion-3d";
import { EllipseCurve, Mesh, SphereGeometry, Group, Color } from "three";
import SingletonHome from "../_utils/singleton";
import { Float, Line, Stars, Trail } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
// https://codesandbox.io/embed/xzi6ps?codemirror=1
// https://codesandbox.io/p/sandbox/bezier-curves-nodes-3k4g6?file=%2Fsrc%2FNodes.js

const Sphere = () => {
  const meshRef = useRef<Mesh>(null!);
  const groupRef = useRef<Group>(null!);
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
  const inst = SingletonHome.getInstance();

  useFrame((state) => {
    if (!meshRef.current || !meshRef.current.geometry.userData.randomArray)
      return;
    const speed = inst.data.get();
    const geoRef = meshRef.current.geometry as SphereGeometry;
    const randomArray = geoRef.userData.randomArray;
    const positionArray = geoRef.attributes.position.array;
    if (geoRef.userData.randomArray.length !== positionArray.length)
      return console.error("length not matched");
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < positionArray.length; i += 3) {
      positionArray[i] += Math.sin(time + randomArray[i] * 100) * 0.001;
      positionArray[i + 1] += Math.sin(time + randomArray[i + 1] * 100) * 0.001;
      positionArray[i + 2] += Math.sin(time + randomArray[i + 2] * 100) * 0.001;
    }
    // if (groupRef.current) {
    // groupRef.current.rotation.y = Math.sin(time) * 0.1;
    // groupRef.current.rotation.x = groupRef.current.rotation.x + 0.0001;
    // groupRef.current.rotation.y = groupRef.current.rotation.y + 0.001 * speed;
    // groupRef.current.rotation.y = groupRef.current.rotation.z + 0.001 * speed;
    // }
    geoRef.rotateX(0.001 * speed);
    geoRef.rotateY(0.001 * speed);
    geoRef.attributes.position.needsUpdate = true;
  });

  const points = useMemo(
    () =>
      new EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100),
    []
  );
  return (
    <group
      ref={groupRef}
      // animate={{ rotateX: 1 }}
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
        <meshStandardMaterial
          color="hsl(240, 5.03%, 64.9%)"
          side={2 /* DoubleSide */}
          flatShading
        />
      </mesh>
    </group>
  );
};

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef<Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(
      Math.sin(t) * radius,
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
      0
    );
  });
  return (
    <group {...props}>
      <Trail
        local
        width={5}
        length={6}
        color={new Color(2, 5, 10)}
        attenuation={(t) => t * t}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  );
}

export const BlackBall = () => {
  return (
    <MotionConfig transition={{ type: "tween" }}>
      <motion.div className=" fixed top-0 left-0 w-screen h-screen -z-2">
        <MotionCanvas>
          {/* <pointLight color={"red"} position={[15, 15, 15]} /> */}
          <ambientLight color="hsl(240, 5.03%, 64.9%)" intensity={0.01} />
          <directionalLight
            color="hsl(240, 5.03%, 64.9%)"
            position={[1, 0, 5]}
            intensity={1}
          />
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere />
          </Float>
          <Stars saturation={0} count={400} speed={0.5} />
          <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
          </EffectComposer>
        </MotionCanvas>
      </motion.div>
    </MotionConfig>
  );
};

export default BlackBall;
