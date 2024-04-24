"use client";

import { MotionValue } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const frameCount = 15;
const urls = new Array(frameCount)
  .fill(true)
  .map((o, i) => `/home/moong-me/${(i + 1).toString()}.png`);

export function AboutCanvas(props: {
  delta: MotionValue<number>;
  width: number;
  height: number;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isInView: boolean;
  speed: number;
}) {
  const router = useRouter();
  const { width, height, canvasRef, isInView, speed, delta } = props;
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [curFrame, setCurFrame] = useState(0);

  useEffect(() => {
    const frame = Math.abs(
      Math.floor(
        urls.length * (curFrame / urls.length + delta.get() / 1000) * speed
      )
    );
    if (frame !== curFrame) {
      setCurFrame(frame);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delta]);

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[curFrame]) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[curFrame];
    ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "white";
    ctx.fillText("About", 30, 20);
  }, [canvasRef, curFrame, images, isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    setImages(
      urls.map((url) => {
        let img = new Image();
        img.src = url;
        return img;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => router.push("/about")}
      style={{
        zIndex: 1,
        position: "absolute",
        minWidth: width,
        minHeight: height,
        cursor: "pointer",
        top: height / 4,
        left: width / 4,
      }}
    />
  );
}
