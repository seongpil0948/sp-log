"use client";
import { useEffect, useRef } from "react";

export default function CircleLine(props: {
  width: number;
  height: number;
  radius: number;
  startAngle?: number; // radian
  endAngle?: number; // radian
  angleStep?: number;
}) {
  const {
    width,
    height,
    radius,
    startAngle = 0, // no radian
    endAngle = 360,
    angleStep = 10,
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
    // 원을 그리기 위한 경로를 시작
    ctx.beginPath();

    // 첫 번째 점의 좌표 계산
    let angle = startAngle;
    // x좌표는 중심의 x좌표에 반지름과 코사인 θ의 곱을 더한 값
    let x = centerX + radius * Math.cos((angle * Math.PI) / 180);
    // y좌표는 중심의 y좌표에 반지름과 사인 θ의 곱을 더한 값
    let y = centerY + radius * Math.sin((angle * Math.PI) / 180);

    // 첫 번째 점에서 경로를 시작
    ctx.moveTo(x, y);

    // 다음 점들의 좌표를 계산하고 선으로 연결하기
    while (angle < endAngle) {
      // 각도를 10도씩 증가시키기
      angle += angleStep;
      // 다음 점의 좌표 계산
      x = centerX + radius * Math.cos((angle * Math.PI) / 180);
      y = centerY + radius * Math.sin((angle * Math.PI) / 180);
      ctx.lineTo(x, y);
    }
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
