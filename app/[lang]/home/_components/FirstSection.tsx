"use client";

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useIntersect } from "@/app/_utils/client/hooks/intersect";
import { useInView } from "framer-motion";
import { sectionCls } from "../theme";
import Image from "next/image";
import { useWindowSize } from "@/app/_utils/client/responsive";

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
  const init = useCallback(() => {
    props.handleScroll(0);
    setCurFrame(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const size = useWindowSize();

  useEffect(() => {
    console.info("canvas isInView : ", isInView);
    if (isInView && props.containerScrollable) {
      console.info("init");
      init();
    }
  }, [init, isInView]);

  const [curFrame, setCurFrame] = useState(0);
  const handOnWheel = (e: React.WheelEvent) => {
    if (props.containerScrollable || !isInView) return;
    const delta = e.deltaY;

    const frame = Math.floor(
      urls.length * (curFrame / urls.length + delta / 1000)
    );
    if (frame !== curFrame) {
      setCurFrame(frame);
      props.handleScroll(frame / urls.length);
    }
  };
  return (
    <section
      ref={sectionRef}
      className={clsx(sectionCls)}
      onWheel={handOnWheel}
    >
      홈 화면입니다.
      <Image
        src={urls[curFrame]}
        alt="hihi"
        width={size.width}
        height={size.height * 0.9}
        style={{
          objectFit: "cover",
          height: "auto",
          width: "auto",
          margin: "auto",
        }}
      />
      {/* <canvas onResize={resize} ref={canvasRef} />; */}
    </section>
  );
}
