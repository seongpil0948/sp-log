'use client'

import type { Mesh } from 'three'
import { isCloseTo } from './common'

export default class GuestBook {
  x: number
  y: number
  z: number
  modelMesh?: Mesh

  constructor(info: any) {
    // Replace 'any' with the appropriate type
    this.x = info.x
    this.y = info.y
    this.z = info.z

    info.gltfLoader.load(info.modelSrc, (glb: any) => {
      // Replace 'any' with the appropriate type
      console.log('GuestBook GLTF loaded: ', glb)
      this.modelMesh = glb.scene.children[0]
      if (this.modelMesh) {
        this.modelMesh.castShadow = true
        this.modelMesh.position.set(this.x, this.y, this.z)
        this.modelMesh.rotateY(Math.PI / 4)
        info.scene.add(this.modelMesh)
      }
    })
  }

  isCloseTo(dest: { x: number; z: number }) {
    return this.modelMesh && isCloseTo(this.modelMesh.position, dest, 0.3)
  }
}
