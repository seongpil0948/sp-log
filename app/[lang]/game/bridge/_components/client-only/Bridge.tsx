// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client'

import GoHomeBtnAbsolute from '@/components/client-only/button/absolute'
import { useEffect, useRef } from 'react'

import * as CANNON from 'cannon-es'
import gsap from 'gsap'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { PreventDragClick } from '../../../_utils/PreventDragClick'
import { Bar } from '../../_logic/Bar'
import { cm1, cm2 } from '../../_logic/common'
import { Glass } from '../../_logic/Glass'
import { Pillar } from '../../_logic/Pillar'
import { Player } from '../../_logic/Player'
import { SideLight } from '../../_logic/SideLight'
import { Stuff } from '../../_logic/Stuff'

import type { Floor } from '../../_logic/Floor'

type GlassType = 'normal' | 'strong'
export default function Bridge() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    // Scene은 common.js에서 생성
    cm1.scene.background = new THREE.Color(cm2.backgroundColor)

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const camera2 = camera.clone()

    camera.position.x = -4
    camera.position.y = 19
    camera.position.z = 14

    camera2.position.y = 0
    camera2.lookAt(0, 1, 0)

    cm1.scene.add(camera, camera2)

    // Light
    const ambientLight = new THREE.AmbientLight(cm2.lightColor, 0.8)
    cm1.scene.add(ambientLight)

    const spotLightDistance = 50
    const spotLight1 = new THREE.SpotLight(cm2.lightColor, 3000)
    spotLight1.castShadow = true
    spotLight1.shadow.mapSize.width = 2048
    spotLight1.shadow.mapSize.height = 2048
    const spotLight2 = spotLight1.clone()
    const spotLight3 = spotLight1.clone()
    const spotLight4 = spotLight1.clone()
    spotLight1.position.set(-spotLightDistance, spotLightDistance, spotLightDistance)
    spotLight2.position.set(spotLightDistance, spotLightDistance, spotLightDistance)
    spotLight3.position.set(-spotLightDistance, spotLightDistance, -spotLightDistance)
    spotLight4.position.set(spotLightDistance, spotLightDistance, -spotLightDistance)
    cm1.scene.add(spotLight1, spotLight2, spotLight3, spotLight4)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    // 물리 엔진
    cm1.world.gravity.set(0, -10, 0)

    const defaultContactMaterial = new CANNON.ContactMaterial(cm1.defaultMaterial, cm1.defaultMaterial, {
      friction: 0.3,
      restitution: 0.2,
    })
    const glassDefaultContactMaterial = new CANNON.ContactMaterial(cm1.glassMaterial, cm1.defaultMaterial, {
      friction: 1,
      restitution: 0,
    })
    const playerGlassContactMaterial = new CANNON.ContactMaterial(cm1.playerMaterial, cm1.glassMaterial, {
      friction: 1,
      restitution: 0,
    })
    cm1.world.defaultContactMaterial = defaultContactMaterial
    cm1.world.addContactMaterial(glassDefaultContactMaterial)
    cm1.world.addContactMaterial(playerGlassContactMaterial)

    // 물체 만들기
    const glassUnitSize = 1.2 // 유리판 크기
    const numberOfGlass = 10 // 유리판 개수
    const objects: VillageObject[] = []

    // 바닥
    // const floor = new Floor({
    //   name: 'floor',
    // })

    // 기둥
    const pillar1 = new Pillar({
      name: 'pillar',
      x: 0,
      y: 5.5,
      z: -glassUnitSize * 12 - glassUnitSize / 2,
    })
    const pillar2 = new Pillar({
      name: 'pillar',
      x: 0,
      y: 5.5,
      z: glassUnitSize * 12 + glassUnitSize / 2,
    })
    objects.push(pillar1, pillar2)

    // 바
    const bar1 = new Bar({name: 'bar', x: -1.6, y: 10.3, z: 0})
    // const bar2 = new Bar({name: 'bar', x: -0.4, y: 10.3, z: 0})
    // const bar3 = new Bar({name: 'bar', x: 0.4, y: 10.3, z: 0})
    const bar4 = new Bar({name: 'bar', x: 1.6, y: 10.3, z: 0})

    const sideLights: SideLight[] = []
    for (let i = 0; i < 49; i++) {
      sideLights.push(
        new SideLight({
          name: 'sideLight',
          container: bar1.mesh,
          z: i * 0.5 - glassUnitSize * 10,
        }),
      )
    }
    for (let i = 0; i < 49; i++) {
      sideLights.push(
        new SideLight({
          name: 'sideLight',
          container: bar4.mesh,
          z: i * 0.5 - glassUnitSize * 10,
        }),
      )
    }

    // 유리판
    let glassTypeNumber = 0
    let glassTypes: [GlassType, GlassType] = ['normal', 'strong']
    const glassZ: number[] = []
    for (let i = 0; i < numberOfGlass; i++) {
      glassZ.push(-(i * glassUnitSize * 2 - glassUnitSize * 9))
    }
    for (let i = 0; i < numberOfGlass; i++) {
      glassTypeNumber = Math.round(Math.random())
      switch (glassTypeNumber) {
        case 0:
          glassTypes = ['normal', 'strong']
          break
        case 1:
          glassTypes = ['strong', 'normal']
          break
      }

      const glass1 = new Glass({
        step: i + 1,
        name: `glass-${glassTypes[0]}`,
        x: -1,
        y: 10.5,
        z: glassZ[i],
        type: glassTypes[0],
        cannonMaterial: cm1.glassMaterial,
      })

      const glass2 = new Glass({
        step: i + 1,
        name: `glass-${glassTypes[1]}`,
        x: 1,
        y: 10.5,
        z: glassZ[i],
        type: glassTypes[1],
        cannonMaterial: cm1.glassMaterial,
      })

      objects.push(glass1, glass2)
    }

    // 플레이어
    const player = new Player({
      name: '1min',
      x: 0,
      y: 10.9,
      z: 13,
      rotationY: Math.PI,
      cannonMaterial: cm1.playerMaterial,
      mass: 30,
    })
    objects.push(player)

    // Raycaster
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    function checkIntersects() {
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObjects(cm1.scene.children)
      for (const item of intersects) {
        // console.log(item.object.step);
        checkClickedObject(item.object)
        break
      }
    }

    let fail = false
    let jumping = false
    let onReplay = false
    function checkClickedObject(mesh: any) {
      if (!player.cannonBody) return
      if (mesh.name.indexOf('glass') >= 0) {
        // 유리판을 클릭했을 때
        if (jumping || fail) return

        if (mesh.step - 1 === cm2.step) {
          player.actions[2].stop()
          player.actions[2].play()
          jumping = true
          cm2.step++
          console.log(cm2.step)

          switch (mesh.type) {
            case 'normal':
              console.log('normal!')
              setTimeout(() => {
                fail = true
                player.actions[0].stop()
                player.actions[1].play()
                sideLights.forEach(item => {
                  item.turnOff()
                })

                setTimeout(() => {
                  onReplay = true
                  if (player.cannonBody) player.cannonBody.position.y = 9

                  setTimeout(() => {
                    onReplay = false
                  }, 3000)
                }, 2000)
              }, 700)
              break
            case 'strong':
              console.log('strong!')
              break
          }

          setTimeout(() => {
            jumping = false
          }, 1000)

          gsap.to(player.cannonBody.position, {
            duration: 1,
            x: mesh.position.x,
            z: glassZ[cm2.step - 1],
          })
          gsap.to(player.cannonBody.position, {
            duration: 0.4,
            y: 12,
          })

          // 클리어!
          if (cm2.step === numberOfGlass && mesh.type === 'strong') {
            setTimeout(() => {
              if (!player.cannonBody) return
              player.actions[2].stop()
              player.actions[2].play()
              gsap.to(player.cannonBody.position, {
                duration: 1,
                x: 0,
                z: -14,
              })
              gsap.to(player.cannonBody.position, {
                duration: 0.4,
                y: 12,
              })
            }, 1500)
          }
        }
      }
    }

    // 그리기
    const clock = new THREE.Clock()

    function draw() {
      const delta = clock.getDelta()

      if (cm1.mixer) cm1.mixer.update(delta)

      // cm1.world.step(1/60, delta, 3);
      // 화면 주사율에 따라 다르게 처리
      let cannonStepTime = 1 / 60
      if (delta < 0.012) cannonStepTime = 1 / 120
      cm1.world.step(cannonStepTime, delta, 3)

      objects.forEach(item => {
        try {
          if (Stuff.hasCannonBody(item)) {
            if (Player.isPlayer(item)) {
              if (item.modelMesh) {
                item.modelMesh.position.copy(item.cannonBody.position)
                if (fail) item.modelMesh.quaternion.copy(item.cannonBody.quaternion)
                item.modelMesh.position.y += 0.15
              }
            } else if (Stuff.hasMesh(item)) {
              item.mesh.position.copy(item.cannonBody.position)
              item.mesh.quaternion.copy(item.cannonBody.quaternion)

              if (Stuff.hasModelMesh(item)) {
                item.modelMesh.position.copy(item.cannonBody.position)
                item.modelMesh.quaternion.copy(item.cannonBody.quaternion)
              }
            }
          }
        } catch (e) {
          console.error(item)
          throw e
        }
      })

      controls.update()

      if (!onReplay) {
        renderer.render(cm1.scene, camera)
      } else {
        renderer.render(cm1.scene, camera2)
        if (player.cannonBody) {
          camera2.position.x = player.cannonBody.position.x
          camera2.position.z = player.cannonBody.position.z
        }
      }
      renderer.setAnimationLoop(draw)
    }

    function setSize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.render(cm1.scene, camera)
    }

    // 이벤트
    const preventDragClick = new PreventDragClick(canvas)
    window.addEventListener('resize', setSize)
    canvas.addEventListener('click', e => {
      if (preventDragClick.mouseMoved) return
      mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1
      mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1)
      checkIntersects()
    })

    draw()
  })

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      />
      <GoHomeBtnAbsolute />
    </>
  )
}
type VillageObject = Stuff | Player | Glass | Floor | Pillar | Bar | SideLight
