"use client";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "@/app/_game/_components/models/OneMin";
export default function Village() {
  return (
    <Canvas>
      <ambientLight />
      <Suspense>
        <Model />
      </Suspense>
    </Canvas>
  );
}
