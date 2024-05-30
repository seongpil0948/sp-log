import {Mesh} from 'three'


import {cm1, geo, mat} from './common'
import {Stuff} from './Stuff'

import type {BoxGeometry, Material} from 'three'

export class Bar extends Stuff {
  geometry: BoxGeometry
  material: Material
  width: number
  height: number
  depth: number
  mesh: Mesh

  constructor(info: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    super(info)

    this.geometry = geo.bar
    this.material = mat.bar

    this.width = this.geometry.parameters.width
    this.height = this.geometry.parameters.height
    this.depth = this.geometry.parameters.depth

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.position.set(this.x, this.y, this.z)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    cm1.scene.add(this.mesh)

    this.setCannonBody()
  }
}
