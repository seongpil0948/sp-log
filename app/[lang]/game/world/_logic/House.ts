'use client'

import type { Object3D, Object3DEventMap, Scene } from "three"
import type { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

export default class House {
  x: number
  y: number
  z: number
  visible: boolean
  modelMesh?: Object3D<Object3DEventMap> // Replace 'any' with the appropriate type

  constructor(info: {
    gltfLoader: GLTFLoader
    x: number
    y: number
    z: number
    modelSrc: string
    scene: Scene
  }) {
    // Replace 'any' with the appropriate type
    this.x = info.x
    this.y = info.y
    this.z = info.z

    this.visible = false

    info.gltfLoader.load(info.modelSrc, (glb: any) => {
      // Replace 'any' with the appropriate type
      this.modelMesh = glb.scene.children[0]
      this.modelMesh!.castShadow = true
      this.modelMesh?.position.set(this.x, this.y, this.z)
      info.scene.add(this.modelMesh!)
    })
  }
}
