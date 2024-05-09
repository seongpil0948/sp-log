// https://github.com/motiondivision/motionone/blob/main/packages/utils/src/wrap.ts

// wrap(0, 100, 105)는 5를 반환합니다.
// wrap(0, 10, 15)는 5를 반환합니다.
// wrap(3, 10, 15)는 8를 반환합니다.
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export const clamp = (min: number, max: number, v: number) =>
  Math.min(Math.max(v, min), max)

/*
  Convert velocity into velocity per second

  @param [number]: Unit per frame
  @param [number]: Frame duration in ms
*/
export function velocityPerSecond(velocity: number, frameDuration: number) {
  return frameDuration ? velocity * (1000 / frameDuration) : 0
}

export const progress = (min: number, max: number, value: number) =>
  max - min === 0 ? 1 : (value - min) / (max - min)

export const mix = (min: number, max: number, progress: number) =>
  -progress * min + progress * max + min

export function fillOffset(offset: number[], remaining: number): void {
  const min = offset[offset.length - 1]
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i)
    offset.push(mix(min, 1, offsetProgress))
  }
}

export function defaultOffset(length: number): number[] {
  const offset = [0]
  fillOffset(offset, length - 1)
  return offset
}
