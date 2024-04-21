"use client";

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useIntersect } from "@/app/_utils/client/hooks/intersect";
import { useInView } from "framer-motion";
import { sectionCls } from "../theme";

const frameCount = 147;
const urls = new Array(frameCount)
  .fill(true)
  .map((o, i) => `/home/image_${(i + 1).toString().padStart(4, "0")}.jpg`);

export function FirstSection(props: {
  handleScroll: (progress: number) => void;
  containerScrollable: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // FIXME: not working when replay
  const isInView = useInView(canvasRef, { amount: "some" });

  const init = useCallback(() => {
    props.handleScroll(0);
    setCurFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.info("canvas isInView : ", isInView);
    if (isInView) {
      init();
    }
  }, [init, isInView]);

  const [curFrame, setCurFrame] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    if (!isInView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !images[curFrame]) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[curFrame], 0, 0);
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

  const handOnWheel = (e: React.WheelEvent) => {
    if (props.containerScrollable || !isInView) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const delta = e.deltaY;

    const frame = Math.floor(
      urls.length * (curFrame / urls.length + delta / 1000)
    );
    if (frame !== curFrame && images[frame]) {
      setCurFrame(frame);
      // only draw if necessary
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[frame], 0, 0);
      props.handleScroll(frame / urls.length);
    }
  };
  return (
    <section className={clsx(sectionCls)} onWheel={handOnWheel}>
      홈 화면입니다.
      <div>
        <canvas onResize={resize} ref={canvasRef} />;
      </div>
    </section>
  );
}
