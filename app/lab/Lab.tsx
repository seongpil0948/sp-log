'use client'
import './style.css'
import {LoadingPetal} from '@/components/client-only/loading/LoadingPetal'
import {AlertText} from '@/components/server-only/alert'
import {title} from '@/config/variants/primitives'

import clsx from 'clsx'

import CircleLine from './circles/circle-line'
import CirclePoint from './circles/circle-point'

export default function Lab() {
  console.log('ho')
  return (
    <>
      <div className={clsx('w-screen h-screen text-center flex flex-col justify-between overflow-auto')}>
        <div
          className={title({
            size: 'md',
            color: 'pink',
          })}
        >
          Lab
        </div>
        <LoadingPetal />
        <AlertText title="Default" color="default">
          Information Card
        </AlertText>
        <AlertText title="Info" color="info">
          Information Card
        </AlertText>
        <AlertText color="warn">Warning Card</AlertText>
        <AlertText title="Error" color="error">
          Error Card
        </AlertText>
        <div className=" flex flex-col gap-3 justify-center">
          <CirclePoint numPoints={200} width={100} height={100} radius={50} endAngle={Math.PI * 2} />
          <CircleLine width={100} height={100} radius={50} />
        </div>
      </div>
    </>
  )
}
