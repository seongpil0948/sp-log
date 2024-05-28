import { Mesh } from 'three'

import { cm1, cm2, geo, mat } from './common'

import type { Material, SphereGeometry } from 'three'


export class SideLight {
  name: string
  x: number
  y: number
  z: number
  geometry: SphereGeometry
  material: Material
  mesh: Mesh

  constructor(info: {container?: Mesh; name?: string; x?: number; y?: number; z?: number}) {
    const container = info.container || cm1.scene

    this.name = info.name || ''
    this.x = info.x || 0
    this.y = info.y || 0
    this.z = info.z || 0

    this.geometry = geo.sideLight
    this.material = mat.sideLight

    this.mesh = new Mesh(this.geometry, this.material)
    this.mesh.position.set(this.x, this.y, this.z)
    // this.mesh.castShadow = true;
    // this.mesh.receiveShadow = true;
    container.add(this.mesh)
  }

  turnOff() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    ;(this.mesh.material as any).color.set(cm2.lightOffColor)
  }
}
