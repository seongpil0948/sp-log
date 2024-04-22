"use client";

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useInView, motion, MotionConfig } from "framer-motion";
import { sectionCls } from "../theme";
import { useWindowSize } from "@/app/_utils/client/responsive";
import { useRouter } from "next/navigation";
import HomeNavigation from "./HomeNavigation";

const frameCount = 15;
const urls = new Array(frameCount)
  .fill(true)
  .map((o, i) => `/home/moong-me/${(i + 1).toString()}.png`);

export function FirstSection(props: {
  handleScroll: (progress: number) => void;
  containerScrollable: boolean;
}) {
  const router = useRouter();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.9,
    margin: "64px 0px 0px 0px",
  });
  const [curFrame, setCurFrame] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s = useWindowSize();

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
    ctx.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "white";
    ctx.fillText("About", 30, 20);
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
  }, []);

  const speed = 1;
  const handOnWheel = (e: React.WheelEvent) => {
    if (!isInView) return;
    const delta = e.deltaY;

    const frame = Math.abs(
      Math.floor(urls.length * (curFrame / urls.length + delta / 1000) * speed)
    );
    if (frame !== curFrame) {
      setCurFrame(frame);
      props.handleScroll(frame / urls.length);
    }
  };

  const blackWidth = s.width / 2;
  const blackHeight = s.height / 2;
  const itemStyle: CSSProperties = {
    zIndex: 1,
    position: "absolute",
    minWidth: blackWidth,
    minHeight: blackHeight,
    cursor: "pointer",
  };
  const blackHole = {
    itemStyle,
    initial: { opacity: 0, x: 0 },
  };
  return (
    <section
      ref={sectionRef}
      className={clsx(sectionCls, "relative")}
      onWheel={handOnWheel}
    >
      <MotionConfig transition={{ duration: 1, type: "spring" }}>
        <motion.span
          initial={blackHole.initial}
          whileInView={{
            opacity: 1,
            x: -(blackWidth * 0.8),
            y: -(blackHeight * 0.8),
          }}
          style={{
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "3rem",
            color: "white",
          }}
        >
          Seongpil Dev
        </motion.span>
        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: 1,
            x: blackWidth * 0.8,
            y: blackHeight / 3,
            rotate: 5,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <canvas
            ref={canvasRef}
            onClick={() => router.push("/about")}
            style={{
              ...blackHole.itemStyle,
              top: blackHeight / 4,
              left: blackWidth / 4,
            }}
          />
        </motion.div>

        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: 1,
            x: blackWidth * 0.3,
            rotate: -5,
            y: blackHeight * 0.6,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
          style={{
            width: blackWidth,
            height: blackHeight * 2,
          }}
        >
          <HomeNavigation />
        </motion.div>
      </MotionConfig>
    </section>
  );
}
