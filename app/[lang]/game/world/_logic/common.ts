import type {Vector3} from 'three'

export function isCloseTo(src: {x: number; z: number}, dest: {x: number; z: number}, factor: number = 0.03) {
  return Math.abs(dest.x - src.x) < factor && Math.abs(dest.z - src.z) < factor
}
