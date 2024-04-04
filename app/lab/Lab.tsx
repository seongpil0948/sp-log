/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./style.css";
import clsx from "clsx";
import { title } from "@/components/server-only/primitives";
import CirclePoint from "./circles/circle-point";
import CircleLine from "./circles/circle-line";

export default function Lab() {
  return (
    <>
      <div
        className={clsx(
          "w-screen h-screen text-center flex flex-col justify-between overflow-auto"
        )}
      >
        <div
          className={title({
            size: "md",
            color: "pink",
          })}
        >
          Lab
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
      </div>
    </>
  );
}
