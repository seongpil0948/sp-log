"use client";
import clsx from "clsx";
import { sectionCls } from "../theme";
import { useRef } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useInView,
  MotionValue,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { title } from "@/components/server-only/primitives";

export function ProjectSection(props: {
  rootRef: React.RefObject<HTMLDivElement>;
  scrollY: MotionValue<number>;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  return (
    <section ref={sectionRef} className={clsx(sectionCls, "-mt-48")}>
      <ParallaxText
        scrollY={props.scrollY}
        containerRef={sectionRef}
        baseVelocity={-3}
      >
        Framer Motion
      </ParallaxText>
      <ParallaxText
        scrollY={props.scrollY}
        containerRef={sectionRef}
        baseVelocity={3}
      >
        Scroll velocity
      </ParallaxText>
    </section>
  );
}

interface ParallaxProps {
  children: string;
  baseVelocity: number;
  containerRef?: React.RefObject<HTMLDivElement>;
  rootRef?: React.RefObject<HTMLDivElement>;
  scrollY: MotionValue<number>;
}

export function ParallaxText(props: ParallaxProps) {
  const { baseVelocity, children, scrollY } = props;
  const baseX = useMotionValue(0);

  const velocityFactor = useTransform(scrollY, [0, 1000], [0, 10], {
    clamp: false,
  });
  const inView = useInView(props.containerRef!);

  /**
   * This is a magic wrapping for the length of the text - you
   * have to replace for wrapping that works for you or dynamically calculate
   */
  const x = useTransform(baseX, (v) => `${wrap(-30, 30, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    if (!inView) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    /**
     * This is what changes the direction of the scroll once we
     * switch scrolling directions.
     */
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className=" w-screen overflow-hidden -tracking-widest leading-3 m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div
        className={clsx(title(), "flex whitespace-nowrap flex-nowrap ")}
        style={{ x }}
      >
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}
