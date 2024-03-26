"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ImagePanel, isImagePanel } from "../_logics/ImagePanel";
import gsap from "gsap";
import { isMobile } from "@/app/_utils/client/responsive";
import { PreventDragClick } from "../../game/_utils/PreventDragClick";
import { projectsConfig } from "../config";

export default function ProjectCanvas(props: {
  onSelect: (projectId: any) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const preventDragClick = new PreventDragClick(canvas);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 1.5;
    camera.position.z = 4;
    scene.add(camera);
    const ambientLight = new THREE.AmbientLight("white", 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight("white", 1);
    directionalLight.position.x = 1;
    directionalLight.position.z = 2;
    scene.add(directionalLight);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    function handleClick(e: MouseEvent) {
      if (preventDragClick.mouseMoved) return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      checkIntersects();
    }
    function checkIntersects() {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      for (const item of intersects) {
        checkClickedObject(item.object as THREE.Mesh);
        break;
      }
    }
    function checkClickedObject(mesh: THREE.Mesh) {
      console.log(mesh);
      const anySelected = imagePanels.some((item) => item.isSelected);
      if (isImagePanel(mesh) && !anySelected) {
        const target = imagePanels.find((item) => item.mesh.name === mesh.name);
        if (!target) return;
        target.selectAnimation();
        setTimeout(() => {
          props.onSelect(target.projectInfo);
        }, projectsConfig.selectDuration * 1000);
      }
    }

    const planeGeometry = new THREE.PlaneGeometry(0.3, 0.3);
    const textureLoader = new THREE.TextureLoader();
    const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
    const spherePositionArray = sphereGeometry.attributes.position.array;
    const randomPositionArray: THREE.TypedArray = new Float32Array(
      spherePositionArray.length
    );
    const isM = isMobile();
    const scaleFactor = isM ? 0.5 : 3;
    for (let i = 0; i < randomPositionArray.length; i++) {
      randomPositionArray[i] = (Math.random() - 0.5) * scaleFactor;
    }

    // 여러개의 Plane Mesh 생성
    const imagePanels: ImagePanel[] = [];
    let imagePanel;
    for (let i = 0; i < spherePositionArray.length; i += 3) {
      imagePanel = new ImagePanel({
        textureLoader,
        scene,
        geometry: planeGeometry,
        imageSrc: `https://picsum.photos/50/50?random=${i}`,
        x: spherePositionArray[i],
        y: spherePositionArray[i + 1],
        z: spherePositionArray[i + 2],
        projectInfo: {
          id: "abc",
        },
      });

      imagePanels.push(imagePanel);
    }

    // 그리기
    const clock = new THREE.Clock();

    function draw() {
      const delta = clock.getDelta();

      controls.update();

      renderer.render(scene, camera);
      renderer.setAnimationLoop(draw);
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    function setShape(e: any) {
      imagePanels.forEach(
        (item) => item.isSelected && item.disSelectAnimation()
      );
      const type = e.target.dataset.type;
      const array =
        type === "random" ? randomPositionArray : spherePositionArray;
      for (let i = 0; i < imagePanels.length; i++) {
        // 위치 이동
        gsap.to(imagePanels[i].mesh.position, {
          duration: 2,
          x: array[i * 3],
          y: array[i * 3 + 1],
          z: array[i * 3 + 2],
        });

        // 회전
        if (type === "random") {
          gsap.to(imagePanels[i].mesh.rotation, {
            duration: 2,
            x: 0,
            y: 0,
            z: 0,
          });
        } else if (type === "sphere") {
          gsap.to(imagePanels[i].mesh.rotation, {
            duration: 2,
            x: imagePanels[i].sphereRotationX,
            y: imagePanels[i].sphereRotationY,
            z: imagePanels[i].sphereRotationZ,
          });
        }
      }
    }

    // 버튼
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btns");

    const randomBtn = document.createElement("button");
    randomBtn.dataset.type = "random";
    randomBtn.style.cssText = "position: absolute; left: 20px; top: 20px";
    randomBtn.innerHTML = "Random";
    btnWrapper.append(randomBtn);

    const sphereBtn = document.createElement("button");
    sphereBtn.dataset.type = "sphere";
    sphereBtn.style.cssText = "position: absolute; left: 20px; top: 50px";
    sphereBtn.innerHTML = "Sphere";
    btnWrapper.append(sphereBtn);

    document.body.append(btnWrapper);

    // 이벤트
    btnWrapper.addEventListener("click", setShape);
    window.addEventListener("resize", setSize);
    window.addEventListener("click", handleClick);
    draw();
    return () => {
      window.removeEventListener("resize", setSize);
      window.removeEventListener("click", handleClick);
      btnWrapper.removeEventListener("click", setShape);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
