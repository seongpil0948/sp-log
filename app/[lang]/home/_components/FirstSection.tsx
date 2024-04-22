"use client";

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { sectionCls } from "../theme";
// import { Image } from "@nextui-org/image";
import NextImage from "next/image";

const frameCount = 147;
const urls = new Array(frameCount)
  .fill(true)
  .map((o, i) => `/home/image_${(i + 1).toString().padStart(4, "0")}.jpg`);

export function FirstSection(props: {
  handleScroll: (progress: number) => void;
  containerScrollable: boolean;
}) {
  // const canvasRef = useRef<HTMLCanvasElement>(null);
  // const isInView = useInView(canvasRef, { amount: "some" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: "all" });
  const [curFrame, setCurFrame] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = useCallback(() => {
    setCurFrame(0);
    props.handleScroll(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInView && props.containerScrollable) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init, isInView]);

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[curFrame]) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = images[curFrame];
    ctx.drawImage(
      img,
      canvas.width * 0.3,
      canvas.height * 0.3,
      canvas.width * 0.6,
      canvas.height * 0.6
    );
  }, [curFrame, images, isInView]);

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
    resize();
  }, []);

  const resize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const stageWidth = document.body.clientWidth;
    const stageHeight = document.body.clientHeight;
    canvas.width = stageWidth * 2;
    canvas.height = stageHeight * 2;
    ctx.scale(1, 1);
  };

  const speed = 2;
  const handOnWheel = (e: React.WheelEvent) => {
    if (props.containerScrollable || !isInView) return;
    const delta = e.deltaY;

    const frame = Math.abs(
      Math.floor(urls.length * (curFrame / urls.length + delta / 1000) * speed)
    );
    if (frame !== curFrame) {
      setCurFrame(frame);
      props.handleScroll(frame / urls.length);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={clsx(sectionCls, "relative ")}
      onWheel={handOnWheel}
    >
      홈 화면입니다.
      <canvas
        onResize={resize}
        ref={canvasRef}
        style={{
          zIndex: 1,
          top: 0,
          left: 0,
          width: "80vw",
          height: "80vh",
          position: "absolute",
        }}
      >
        <NextImage
          src={urls[curFrame]}
          alt="hihi"
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw, 40vw"
        />
      </canvas>
      {/* <canvas onResize={resize} ref={canvasRef} />; */}
    </section>
  );
}
