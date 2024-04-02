/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import "./style.css";
import clsx from "clsx";
import { title } from "@/components/server-only/primitives";

export default function Lab() {
  return (
    <>
      <div
        className={clsx(
          "w-screen h-screen text-center flex flex-col justify-between"
        )}
      >
        <div
          className={title({
            size: "md",
            color: "pink",
          })}
        >
          Lab
        </div>
      </div>
    </>
  );
}
