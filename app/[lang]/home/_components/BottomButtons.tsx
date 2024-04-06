"use client";
import useTour, { TargetWrapper } from "@/app/_utils/client/hooks/tour";
import { useWindowSize } from "@/app/_utils/client/responsive";
import GeoButton from "@/components/client-only/three-d/geo-button";
import { typo } from "@/components/server-only/primitives";
import clsx from "clsx";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";

type Vec2 = { x: number; y: number };
const btnClass = clsx(
  typo({
    size: "xl",
    color: "foreground",
    font: "script",
    weight: "bold",
  })
);
export default function BottomButtons() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{
    clickedPos: Vec2;
    pathList: Vec2[];
    animationPath: string;
  }>({
    clickedPos: { x: 0, y: 0 },
    pathList: [],
    animationPath: "",
  });

  const size = useWindowSize();
  const getEndPos = () => {
    console.log("targetRef.current", targetRef.current);
    if (!targetRef.current) return { x: 0, y: 0 };
    const target = targetRef.current;
    const rect = target.getBoundingClientRect();
    console.info("rect", rect);
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  };
  const getMiddlePoint = (startPos: Vec2, endPos: Vec2) => {
    return {
      x: (startPos.x + endPos.x) / 2,
      y: (startPos.y + endPos.y) / 2,
    };
  };

  const makeArc = (
    x: number,
    y: number,
    radius: number,
    cloakWise: boolean
  ) => {
    return `A ${radius} ${radius} 0 0 ${cloakWise ? 1 : 0} ${x} ${y}`;
  };

  const makeCurve = (startPos: Vec2, middlePos: Vec2, endPos: Vec2) => {
    return `C ${middlePos.x} ${middlePos.y} ${middlePos.x} ${
      middlePos.y + puddle
    } ${endPos.x} ${endPos.y}`;
  };

  const { overlayRef, onOverlay, offOverlay, overlayStyle, isOverlay } =
    useTour();
  const puddle = 100;
  const controls = useAnimationControls();

  const handleClicked = useCallback((e: globalThis.MouseEvent) => {
    controls.set("hidden");
    console.log(isOverlay);
    if (isOverlay || overlayRef.current?.style.display === "block") {
      return offOverlay();
    }
    onOverlay();
    const clickedPos = { x: e.clientX, y: e.clientY };
    const endPos = getEndPos();
    const middle = getMiddlePoint(clickedPos, endPos);
    const startToMiddle = getMiddlePoint(clickedPos, middle);
    const middleToEnd = getMiddlePoint(middle, endPos);
    const startPath = `M ${clickedPos.x} ${clickedPos.y}`;
    const curveToMiddle = makeCurve(clickedPos, startToMiddle, middle);
    const between = Math.abs(startToMiddle.y - middle.y);
    const arcRadius = between / 2;
    const arcFromMiddleSideNormal = makeArc(
      startToMiddle.x,
      startToMiddle.y,
      arcRadius,
      false
    );
    const arcFromMiddleSideInverse = makeArc(
      middle.x,
      middle.y,
      arcRadius,
      false
    );
    const curveToEnd = makeCurve(middle, middleToEnd, endPos);

    setState((prev) => {
      console.log("prev", prev);
      return {
        pathList: [clickedPos, startToMiddle, middle, middleToEnd, endPos],
        clickedPos,
        endPos,
        animationPath: `${startPath} ${curveToMiddle} ${arcFromMiddleSideNormal}  ${arcFromMiddleSideInverse} ${curveToEnd}`,
      };
    });

    controls.start("visible");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.addEventListener("click", handleClicked);
    return () => {
      document.body.removeEventListener("click", handleClicked);
    };
  }, [handleClicked]);

  const draw: Variants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: {
          type: "tween",
          duration: 1,
          bounce: 0.25,
          damping: 1,
          stiffness: 50,
          restDelta: 0.01,
        },
        opacity: { type: "tween", duration: 1, bounce: 0.5 },
      },
    },
    visible: (custom: number) => {
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: {
            type: "tween",
            duration: custom,
            bounce: 0.25,
            damping: 1,
            stiffness: 50,
            restDelta: 0.01,
          },
          opacity: { type: "tween", duration: 1, bounce: 0.5 },
        },
      };
    },
  };
  useEffect(() => {
    console.log("isOverlay", isOverlay);
  }, [isOverlay]);
  return (
    <>
      <TargetWrapper animate={isOverlay ? "pulse" : "initial"}>
        <div
          ref={targetRef}
          className="flex flex-wrap gap-12 md:gap-24 lg:gap-36 justify-center mb-12"
        >
          <GeoButton shape="character" href="/game">
            <p className={btnClass}>Game</p>
          </GeoButton>
          <GeoButton shape="basic" href="/about">
            <p className={btnClass}>About</p>
          </GeoButton>
          <GeoButton shape="basic" href="/docs">
            <p className={btnClass}>Documents</p>
          </GeoButton>
        </div>
      </TargetWrapper>

      <motion.svg
        width={size.width}
        height={size.height}
        style={{
          position: "fixed",
          top: 0,
          pointerEvents: "none",
        }}
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="yellow" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <motion.path
          className={"shooting-star"}
          initial="hidden"
          animate={controls}
          transition={{
            ease: "easeInOut",
          }}
          strokeWidth={4}
          strokeDasharray="0 1"
          // stroke={"#bf4d00"}
          stroke={"url(#grad1)"}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          custom={2}
          d={state.animationPath}
          onAnimationStart={() => {
            console.log("onAnimationStart");
          }}
          onAnimationEnd={() => {
            console.log("onAnimationComplete end");
            controls.stop();
          }}
          onAnimationComplete={() => {
            console.log("onAnimationComplete end");
            // controls.set("hidden");
          }}
        />
      </motion.svg>
      <div ref={overlayRef} style={overlayStyle} />
    </>
  );
}
