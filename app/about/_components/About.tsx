"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { House } from "../_logic/House";
import gsap from "gsap";
// import dat from "dat.gui";

export default function About(props: { rootSelector: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let [currentSection, setCurrentSection] = useState(0);
  useEffect(() => {
    const rootContainer = document.querySelector(props.rootSelector);
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
    camera.position.set(1, 2, 25);
    scene.add(camera);
    // Card https://codepen.io/jakedowns/pen/ExoqYRm?editors=0010
    const textureLoader = new THREE.TextureLoader();
    const cardFrontImage = textureLoader.load("/image/me-front.jpeg");
    const cardBackImage = textureLoader.load("/image/me-back.png");
    const cardFrontMaterial = new THREE.MeshBasicMaterial({
      map: cardFrontImage,
      transparent: true,
    });
    const cardBackImageMaterial = new THREE.MeshBasicMaterial({
      map: cardBackImage,
      transparent: true,
    });
    const darkMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
    // const cardMesh = new THREE.Mesh(cardGeometry, cardFrontMaterial);
    const geo = new THREE.BoxGeometry(3, 0.01, 3);
    const cardMesh = new THREE.Mesh(geo, [
      darkMaterial, // left
      darkMaterial, // right
      cardFrontMaterial, // faceup
      cardBackImageMaterial, // facedown
      darkMaterial, //
      darkMaterial, //
    ]);
    cardMesh.position.set(-3, 4, 20);
    cardMesh.rotation.x = Math.PI / 2;
    scene.add(cardMesh);

    // Light
    const ambientLight = new THREE.AmbientLight("#eee7e1", 5);
    scene.add(ambientLight);

    const gltfLoader = new GLTFLoader();
    // Mesh
    const floorMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshStandardMaterial({ color: "#e9dfce" })
    );
    // const gui = new dat.GUI();
    floorMesh.rotation.x = -Math.PI / 2;
    // gui.add(floorMesh.rotation, "x", -5, 5, 0.1).name("guestBook trans Y");
    floorMesh.receiveShadow = true;
    // scene.add(new THREE.AxesHelper(10));
    scene.add(floorMesh);

    // new House({
    //   gltfLoader,
    //   scene,
    //   modelSrc: "/glb/house.glb",
    //   height: SECTION_POSITIONS[0].y,
    //   x: SECTION_POSITIONS[0].x,
    //   z: SECTION_POSITIONS[0].z,
    // });

    const clock = new THREE.Clock();
    function draw() {
      const delta = clock.getDelta();
      cardMesh.rotation.z += delta;
      cardMesh.rotation.y += delta * 0.5;
      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function handleScroll() {
      if (!rootContainer) return;
      const newSection = Math.round(
        rootContainer.scrollTop / rootContainer.clientHeight
      );
      if (currentSection !== newSection) {
        setSection(newSection);
      } else if (rootContainer.scrollTop === 0) {
        setSection(0);
      }
    }
    function setSection(newSection: number) {
      gsap.to(camera.position, {
        duration: 1,
        x: SECTION_POSITIONS[newSection].x,
        z: SECTION_POSITIONS[newSection].z + 5,
      });
      if (currentSection !== newSection) {
        setCurrentSection(newSection);
      }
    }
    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }
    rootContainer.addEventListener("scroll", handleScroll);
    rootContainer.addEventListener("resize", setSize);

    setSection(0);
    draw();
    return () => {
      rootContainer.removeEventListener("scroll", handleScroll);
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

const COMMON_Y = 2;
const SECTION_POSITIONS: THREE.Vector3[] = [
  new THREE.Vector3(-5, COMMON_Y, 20),
  new THREE.Vector3(7, COMMON_Y, 10),
  new THREE.Vector3(-10, COMMON_Y, 0),
  new THREE.Vector3(10, COMMON_Y, -10),
  new THREE.Vector3(-5, COMMON_Y, -20),
];
