/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from "three";
import React, {
  ReactNode,
  use,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useFrame, ThreeEvent, useThree } from "@react-three/fiber";
import { isMobile } from "@/app/_utils/client/responsive";
import { getRandomProjectSingleImg } from "../../project/_logics/projects";
import { IProject } from "../../project/types";
import ProjectPanel from "../_logic/ProjectPanel";
import gsap from "gsap";
import { motion } from "framer-motion-3d";
import { projectsConfig } from "../../project/config";
import { useCursor } from "@/app/_utils/client/hooks/three-d/use-cursor";

const textureLoader = new THREE.TextureLoader();
const imageCache = new Map<string, THREE.Texture>();
const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
const spherePositionArray = sphereGeometry.attributes.position.array;
const randomPositionArray = new Float32Array(spherePositionArray.length);
export type TShape = "sphere" | "random";
function ProjectImage(props: { src: string }) {
  const { src } = props;

  let texture = imageCache.get(src);
  if (!texture) {
    texture = textureLoader.load(src);
    imageCache.set(src, texture);
  }

  return (
    <mesh>
      <planeGeometry attach="geometry" args={[0.3, 0.3]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}

const prevInfos = new Map<string, THREE.Object3D>();
export function ProjectCards(props: { projects: IProject[]; shape: TShape }) {
  const [projectMeshList, setProjectMeshList] = useState<ReactNode[]>([]);
  const [busy, setBusy] = useState(false);
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const pos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const isM = isMobile();
  const scaleFactor = isM ? 0.5 : 3;
  const [panels, setPanels] = useState<ProjectPanel[]>([]);
  const pointerEvents = useCursor();

  const initRandomPositionArray = () => {
    for (let i = 0; i < randomPositionArray.length; i++) {
      randomPositionArray[i] = (Math.random() - 0.5) * scaleFactor;
    }
  };

  const disSelectAnimation = (e: ThreeEvent<MouseEvent>) => {
    const prev = prevInfos.get(e.eventObject.uuid);
    const target = e.eventObject;
    if (!prev) throw new Error("이전 Mesh 정보가 없습니다.");
    gsap.to(target.position, {
      duration: projectsConfig.selectDuration,
      x: prev.position.x,
      y: prev.position.y,
      z: prev.position.z,
    });
    gsap.to(target.scale, {
      x: prev.scale.x,
      y: prev.scale.y,
      z: prev.scale.z,
    });
    gsap.to(target.rotation, {
      x: prev.rotation.x,
      y: prev.rotation.y,
      z: prev.rotation.z,
    });
    prevInfos.delete(e.eventObject.uuid);
  };

  const selectAnimation = (e: ThreeEvent<MouseEvent>) => {
    setBusy(true);
    if (!e.eventObject.isObject3D) return;
    prevInfos.set(e.eventObject.uuid, e.eventObject.clone());
    gsap.to(e.eventObject.position, {
      duration: projectsConfig.selectDuration,
      x: e.camera.position.x,
      y: e.camera.position.y,
      z: e.camera.position.z - 1,
    });
    gsap.to(e.eventObject.rotation, {
      duration: projectsConfig.selectDuration,
      x: -1,
      y: 0,
      z: 0,
    });

    gsap.to(e.eventObject.scale, {
      duration: projectsConfig.selectDuration,
      x: 3,
      y: 3,
      z: 3,
    });
    setTimeout(() => {
      disSelectAnimation(e);
      setBusy(false);
    }, projectsConfig.selectDuration * 2 * 1000);
  };

  const initProjectMeshList = () => {
    const result: ReactNode[] = [];
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      const { projectInfo, imageSrc } = getRandomProjectSingleImg();
      result.push(
        <motion.mesh
          key={projectInfo.title + i}
          name="ProjectPanel"
          // ref={(ref) => {
          //   if (ref) {
          //     const panel = new ProjectPanel({ mesh: ref, projectInfo });
          //     setPanels((prev) => [...prev, panel]);
          //   }
          // }}
          position={
            new THREE.Vector3(
              spherePositionArray[i],
              spherePositionArray[i + 1],
              spherePositionArray[i + 2]
            )
          }
          onClick={selectAnimation}
          {...pointerEvents}
        >
          <ProjectImage src={imageSrc} />
        </motion.mesh>
      );
    }
    setProjectMeshList(result);
  };
  useEffect(() => {
    initRandomPositionArray();
    initProjectMeshList();
  }, []);

  const updateShape = (s: TShape) => {
    console.log("update shape", s, panels);
    if (panels.length < 1) return;
    const array = s === "random" ? randomPositionArray : spherePositionArray;
    for (let i = 0; i < panels.length; i++) {
      const p = panels[i];
      gsap.to(p.mesh.position, {
        duration: 2,
        x: array[i * 3],
        y: array[i * 3 + 1],
        z: array[i * 3 + 2],
      });
      if (s === "random") {
        gsap.to(p.mesh.rotation, {
          duration: 2,
          x: 0,
          y: 0,
          z: 0,
        });
      } else if (s === "sphere") {
        gsap.to(p.mesh.rotation, {
          duration: 2,
          x: p.sphereRotationX,
          y: p.sphereRotationY,
          z: p.sphereRotationZ,
        });
      }
    }
  };
  useEffect(() => {
    updateShape(props.shape);
  }, [props.shape]);

  useFrame((state, delta) => {
    if (!focus) return;
    // zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5);
    // zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 4);

    // state.camera.position.lerp(pos, 0.5);
    // state.camera.updateProjectionMatrix();
    // state.camera.lookAt(look);

    // controls.setLookAt(
    //   state.camera.position.x,
    //   state.camera.position.y,
    //   state.camera.position.z,
    //   look.x,
    //   look.y,
    //   look.z,
    //   true
    // );
  });

  return projectMeshList;
}
