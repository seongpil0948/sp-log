import { SVGProps } from 'react'
export * from './common'
export * from './db'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export enum TIME_FORMATS {
  DAY,
  MIN,
}

export interface StaticAsset {
  fileType: 'image' | 'video'
  objective: 'project'
  part?: string
  ctgr?: string
  src: string
}
