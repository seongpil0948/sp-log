"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { House } from "../_logic/House";
import gsap from "gsap";
// import dat from "dat.gui";

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let [currentSection, setCurrentSection] = useState(0);
  useEffect(() => {
    const rootContainer = document.getElementById("about-root");
    if (!canvasRef.current || !rootContainer) return;
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("white");
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(-5, 2, 25);
    scene.add(camera);

    // Light
    const ambientLight = new THREE.AmbientLight("white", 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight("white", 0.7);
    spotLight.position.set(0, 150, 100);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 200;
    scene.add(spotLight);

    const gltfLoader = new GLTFLoader();

    // Mesh
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "red" })
    );
    // const gui = new dat.GUI();
    floorMesh.rotation.x = -Math.PI / 2;
    // gui.add(floorMesh.rotation, "x", -5, 5, 0.1).name("guestBook trans Y");
    floorMesh.receiveShadow = true;
    // scene.add(new THREE.AxesHelper(10));
    scene.add(floorMesh);

    const houses: House[] = [];
    houses.push(
      new House({
        gltfLoader,
        scene,
        modelSrc: "/glb/house.glb",
        x: -5,
        z: 20,
        height: 2,
      })
    );
    houses.push(
      new House({
        gltfLoader,
        scene,
        modelSrc: "/glb/house.glb",
        x: 7,
        z: 10,
        height: 2,
      })
    );
    houses.push(
      new House({
        gltfLoader,
        scene,
        modelSrc: "/glb/house.glb",
        x: -10,
        z: 0,
        height: 2,
      })
    );
    houses.push(
      new House({
        gltfLoader,
        scene,
        modelSrc: "/glb/house.glb",
        x: 10,
        z: -10,
        height: 2,
      })
    );
    houses.push(
      new House({
        gltfLoader,
        scene,
        modelSrc: "/glb/house.glb",
        x: -5,
        z: -20,
        height: 2,
      })
    );

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSection() {
      // window.pageYOffset
      if (!rootContainer) return;
      const newSection = Math.round(
        rootContainer.scrollTop / rootContainer.clientHeight
      );
      console.log(newSection, currentSection, houses);
      if (currentSection !== newSection) {
        console.log("animation!!");
        gsap.to(camera.position, {
          duration: 1,
          x: houses[newSection].x,
          z: houses[newSection].z + 5,
        });
        setCurrentSection(newSection);
      }
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    rootContainer.addEventListener("scroll", setSection);
    rootContainer.addEventListener("resize", setSize);

    draw();
    return () => {
      rootContainer.removeEventListener("scroll", setSection);
      rootContainer.removeEventListener("resize", setSize);
    };
  }, []);
  return (
    <canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
      }}
      ref={canvasRef}
    ></canvas>
  );
}
