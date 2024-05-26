'use client'
import {isMobile} from '@/app/_utils/client/responsive'
import commonConfig from '@/config'
import {useEffect, useRef, useState} from 'react'

import gsap from 'gsap'
import {useTheme} from 'next-themes'
import * as THREE from 'three'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import type {GLTF} from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function About(props: {rootSelector: string}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [actionCard, setActionCard] = useState(true)
  const {theme, setTheme} = useTheme()
  useEffect(() => {
    const rootContainer = document.querySelector(props.rootSelector)
    if (!canvasRef.current || !rootContainer) return
    if (theme === 'dark') {
      setTheme('light')
    }
    const canvas = canvasRef.current
    const renderer = getRender(canvas)
    const scene = new THREE.Scene()
    const gltfLoader = new GLTFLoader()
    scene.background = new THREE.Color('white')
    const camera = getCamera()
    let characterInfo: InitCharacter | undefined = undefined
    characterInfo = await initCharacter(gltfLoader, scene)
    scene.add(camera)
    // Card https://codepen.io/jakedowns/pen/ExoqYRm?editors=0010
    const cardMesh = initMeCard()
    scene.add(cardMesh)
    const ambientLight = new THREE.AmbientLight('#eee7e1', 5)
    scene.add(ambientLight)
    const floorMesh = initFloorMesh()
    scene.add(floorMesh)

    // Raycaster
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    function handleClick(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      checkIntersects()
    }
    function checkIntersects() {
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children)
      for (const item of intersects) {
        checkClickedObject(item.object as THREE.Mesh)
        break
      }
    }
    function checkClickedObject(mesh: THREE.Mesh) {
      if (mesh.name === IDS.ME) {
        setActionCard(!actionCard)
      }
    }

    const clock = new THREE.Clock()
    function draw() {
      const delta = clock.getDelta()
      if (actionCard) {
        cardMesh.rotation.z += delta
        cardMesh.rotation.y += delta * 0.5
      }
      if (characterInfo) {
        characterInfo.mixer.update(delta)
      }
      renderer.render(scene, camera)
      renderer.setAnimationLoop(draw)
    }

    function handleScroll() {
      if (!rootContainer) return
      const newSection = Math.round(rootContainer.scrollTop / rootContainer.clientHeight)
      if (currentSection !== newSection) {
        setSection(newSection)
      } else if (rootContainer.scrollTop === 0) {
        setSection(0)
      }
    }
    function setSection(newSection: number) {
      gsap.to(camera.position, {
        duration: 1,
        x: SECTION_POSITIONS[newSection].x,
        y: SECTION_POSITIONS[newSection].y,
        z: SECTION_POSITIONS[newSection].z + 5,
      })
      if (currentSection !== newSection) {
        setCurrentSection(newSection)
      }
    }
    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(scene, camera)
    }
    rootContainer.addEventListener('scroll', handleScroll)
    rootContainer.addEventListener('resize', setSize)
    window.addEventListener('click', handleClick)
    setSection(0)
    draw()
    return () => {
      rootContainer.removeEventListener('scroll', handleScroll)
      rootContainer.removeEventListener('resize', setSize)
      window.removeEventListener('click', handleClick)
    }
  }, [actionCard])
  return (
    <canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
      }}
      ref={canvasRef}
    ></canvas>
  )
}

const COMMON_Y = 2
const IDS = {
  ME: 'me-card',
}
const SECTION_POSITIONS: THREE.Vector3[] = [
  new THREE.Vector3(-5, COMMON_Y, 20),
  new THREE.Vector3(7, COMMON_Y, 10),
  new THREE.Vector3(-10, COMMON_Y, 0),
  new THREE.Vector3(10, COMMON_Y, -10),
  new THREE.Vector3(-5, COMMON_Y, -20),
  new THREE.Vector3(5, COMMON_Y, -20),
]

function getRender(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  return renderer
}

function getCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(1, 2, 25)
  return camera
}

function initMeCard() {
  const textureLoader = new THREE.TextureLoader()
  const cardFrontImage = textureLoader.load('/image/me-front.jpeg')
  const cardBackImage = textureLoader.load('/image/me-back.png')
  const cardFrontMaterial = new THREE.MeshBasicMaterial({
    map: cardFrontImage,
    transparent: true,
  })
  const cardBackImageMaterial = new THREE.MeshBasicMaterial({
    map: cardBackImage,
    transparent: true,
  })
  const darkMaterial = new THREE.MeshPhongMaterial({color: 0x111111})
  // const cardMesh = new THREE.Mesh(cardGeometry, cardFrontMaterial);
  const geo = new THREE.BoxGeometry(3, 0.01, 3)
  const cardMesh = new THREE.Mesh(geo, [
    darkMaterial, // left
    darkMaterial, // right
    cardFrontMaterial, // faceup
    cardBackImageMaterial, // facedown
    darkMaterial, //
    darkMaterial, //
  ])
  cardMesh.name = IDS.ME
  const pos = SECTION_POSITIONS[0]
  if (isMobile()) {
    cardMesh.position.set(pos.x, pos.y + 1, pos.z - 5)
  } else {
    cardMesh.position.set(pos.x + 2, pos.y + 1, pos.z)
  }
  cardMesh.rotation.x = Math.PI / 2
  return cardMesh
}

function initFloorMesh() {
  const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({color: '#e9dfce'}),
  )
  floorMesh.rotation.x = -Math.PI / 2
  floorMesh.receiveShadow = true
  return floorMesh
}

interface InitCharacter {
  mesh: THREE.Object3D
  mixer: THREE.AnimationMixer
  actions: THREE.AnimationAction[]
}
function initCharacter(loader: GLTFLoader, scene: THREE.Scene) {
  return new Promise<InitCharacter>(resolve => {
    loader.load(commonConfig.game.character.default, (glb: GLTF) => {
      // Replace 'any' with the appropriate type
      glb.scene.traverse(child => {
        const c = child as THREE.Mesh
        if (c.isMesh) {
          c.castShadow = true
        }
      })

      const mesh = glb.scene.children[0]
      mesh.castShadow = true
      const pos = SECTION_POSITIONS[1]
      if (isMobile()) {
        mesh.position.set(pos.x, pos.y + 1, pos.z - 5)
      } else {
        mesh.position.set(pos.x - 10, pos.y + 1, pos.z)
      }
      mesh.position.set(...SECTION_POSITIONS[1].toArray())
      mesh.rotateY(Math.PI)
      scene.add(mesh)
      const mixer = new THREE.AnimationMixer(mesh)
      const actions = Array.from(glb.animations).map(clip => mixer.clipAction(clip))
      actions[0].play()
      return resolve({mesh, actions, mixer})
    })
  })
}
