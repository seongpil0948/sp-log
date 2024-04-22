"use client";

// https://github.com/seongpil0948/sp-blog
// https://www.apple.com/kr/macbook-air/?afid=p238%7CsiADh6hbK-dc_mtid_18707vxu38484_pcrid_693736852787_pgrid_16348496961_pntwk_g_pchan__pexid_131009289166_&cid=aos-kr-kwgo-Brand--slid-AapXiqMo--product-
// https://www.framer.com/motion/scroll-animations/##no-code

import { CSSProperties, useEffect, useRef } from "react";
import clsx from "clsx";
import {
  useInView,
  motion,
  MotionConfig,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { sectionCls } from "../theme";
import { useWindowSize } from "@/app/_utils/client/responsive";
import HomeNavigation from "./HomeNavigation";
import { AboutCanvas } from "./AboutCanvas";

export function FirstSection(props: { scrollY: MotionValue<number> }) {
  const { scrollY } = props;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    amount: 0.9,
    margin: "64px 0px 0px 0px",
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s = useWindowSize();

  const blackHole = {
    w: s.width / 2,
    h: s.height / 2,
    initial: { opacity: 0, x: 0 },
  };

  const toX = 0.8;
  const toY = 0.8;
  const toR = 5;
  const animateTo = {
    leftT: -(blackHole.w * toX),
    rightT: blackHole.w * toX,
    topT: -(blackHole.h * toY),
    centerVT: blackHole.h / 3,
    common: {
      opacity: 1,
    },
  };
  const inputRage = [0, blackHole.h / 4];
  const leftTX = useTransform(scrollY, inputRage, [animateTo.leftT, 0]);
  const rightTX = useTransform(scrollY, inputRage, [animateTo.rightT, 0]);
  const topTY = useTransform(scrollY, inputRage, [animateTo.topT, 0]);
  const opacity = useTransform(scrollY, inputRage, [1, 0]);
  const rotate = useTransform(scrollY, inputRage, [toR, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("latest: ", latest);
  });

  return (
    <section ref={sectionRef} className={clsx(sectionCls, "relative")}>
      <MotionConfig transition={{ duration: 0.3, type: "just" }}>
        <motion.span
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: leftTX.get(),
            y: topTY.get(),
          }}
          style={{
            position: "absolute",
            zIndex: 1,
            top: "50%",
            left: "50%",
            fontSize: "3rem",
            color: "white",
          }}
        >
          Seongpil Dev
        </motion.span>
        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: rightTX.get(),
            y: animateTo.centerVT,
            rotate: -rotate.get(),
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
        >
          <AboutCanvas
            delta={scrollY}
            isInView={isInView}
            speed={1}
            width={blackHole.w}
            height={blackHole.h}
            canvasRef={canvasRef}
          />
        </motion.div>
        <motion.div
          initial={blackHole.initial}
          whileInView={{
            opacity: opacity.get(),
            x: leftTX.get() + blackHole.w * 1.1,
            rotate: -rotate.get(),
            y: blackHole.h * 0.6,
          }}
          whileHover={{
            scale: 1.1,
            rotate: 0,
            transition: {
              duration: 0.5,
            },
          }}
          style={{
            width: blackHole.w,
            height: blackHole.h * 2,
          }}
        >
          <HomeNavigation />
        </motion.div>
      </MotionConfig>
    </section>
  );
}
