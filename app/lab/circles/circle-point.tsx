"use client";
import { useEffect, useRef } from "react";

export default function CirclePoint(props: {
  width: number;
  height: number;
  radius: number;
  numPoints: number;
  startAngle?: number; // radian
  endAngle?: number; // radian
}) {
  const {
    width,
    height,
    radius,
    numPoints,
    startAngle = 0,
    endAngle = Math.PI / 4,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 원의 중심 좌표
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    // 호의 시작 각도와 종료 각도
    // const startAngle = Math.PI / 4;

    // 각 점의 좌표를 계산하고 연결하여 호를 만듭니다.
    for (let i = 0; i < numPoints; i++) {
      const theta =
        startAngle + ((endAngle - startAngle) * i) / (numPoints - 1);
      const x = centerX + radius * Math.cos(theta);
      const y = centerY + radius * Math.sin(theta);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // second circle
    ctx.translate(centerX, centerY);
    ctx.beginPath();
    // 원의 중심에서 반지름만큼 이동한 점에서 시작
    ctx.moveTo(radius / 4, 0);
    // 반시계 방향으로 원을 그림
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        backgroundColor: "red",
      }}
    />
  );
}
