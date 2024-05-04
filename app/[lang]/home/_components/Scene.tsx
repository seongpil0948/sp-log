"use client";

import { useRef } from "react";
import clsx from "clsx";
import { sectionCls } from "../theme";
import { FirstSection } from "./FirstSection";
import { ProjectSection } from "./ProjectSection";
import { MotionConfig, useScroll, useSpring, useVelocity } from "framer-motion";
import BlackBall from "./BlackBall";
import SingletonHome from "../_utils/singleton";
import DocsSection from "./DocSection";
import LinksContent from "../../about/_components/LinksContent";
import { subtitle } from "@/components/server-only/primitives";

// on first mounted disable scroll and rotate the image
// when frame is equal to length of urls, enable scroll
export function Scene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: rootRef,
    layoutEffect: true,
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const inst = SingletonHome.getInstance();
  inst.setData(smoothVelocity);
  inst.scrollY = scrollY;

  return (
    <MotionConfig transition={{ type: "tween", duration: 0.5 }}>
      {/* TODO: to context or redux */}
      <section
        id="scene"
        ref={rootRef}
        className={clsx(
          sectionCls,
          // "relative snap-both snap-mandatory overflow-auto"
          "relative overflow-auto max-h-screen"
        )}
        style={{
          zIndex: 1,
        }}
      >
        <FirstSection />
        <ProjectSection />
        <AboutSection />
        {/* <DocsSection /> */}
      </section>
      <BlackBall />
    </MotionConfig>
  );
}

export function AboutSection() {
  return (
    <section className={clsx(sectionCls, "pl-4")}>
      <div className={subtitle({ color: "gray" })}>
        사이트 개발자에대해 궁금한가요?
      </div>
      <div className=" w-1/2 mr-auto !text-start mb-6  ">
        <LinksContent isText />
      </div>
    </section>
  );
}
