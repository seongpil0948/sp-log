import {Mesh} from 'three'


import {cm1, geo, mat} from './common'
import {Stuff} from './Stuff'

import type {StuffChildParams} from './Stuff'
import type {BoxGeometry, Material} from 'three'

export class Pillar extends Stuff {
  geometry: BoxGeometry
  material: Material
  mesh: Mesh

  constructor(info: StuffChildParams) {
    super({
      ...geo.pillar.parameters,
      ...info,
    })

    this.geometry = geo.pillar
    this.material = mat.pillar
    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.position.set(this.x, this.y, this.z)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    cm1.scene.add(this.mesh)

    this.setCannonBody()
  }
}
