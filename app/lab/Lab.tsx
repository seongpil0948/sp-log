/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import './style.css'
import clsx from 'clsx'
import { title } from '@/config/variants/primitives'
import CirclePoint from './circles/circle-point'
import CircleLine from './circles/circle-line'
import { AlertText } from '@/components/server-only/alert'

export default function Lab() {
  return (
    <>
      <div
        className={clsx(
          'w-screen h-screen text-center flex flex-col justify-between overflow-auto',
        )}
      >
        <div
          className={title({
            size: 'md',
            color: 'pink',
          })}
        >
          Lab
        </div>
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
          <CirclePoint
            numPoints={200}
            width={100}
            height={100}
            radius={50}
            endAngle={Math.PI * 2}
          />
          <CircleLine width={100} height={100} radius={50} />
        </div>
      </div>
    </>
  )
}
