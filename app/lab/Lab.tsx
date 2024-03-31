/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useState, MouseEvent } from "react";
import { useWindowSize } from "../_utils/client/responsive";
import "./style.css";

type Vec2 = { x: number; y: number };
export default function Lab() {
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

  const puddle = 100;
  const controls = useAnimationControls();
  const handleClicked = (e: MouseEvent) => {
    // controls.stop();
    // controls.mount();
    controls.set("hidden");
    const clickedPos = { x: e.clientX, y: e.clientY };
    const endPos = { x: window.innerHeight / 2, y: window.innerHeight / 2 };
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
        animationPath: `${startPath} ${curveToMiddle} ${arcFromMiddleSideNormal}  ${arcFromMiddleSideInverse} ${curveToEnd}`,
      };
    });

    controls.start("visible");
  };

  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
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
            // staggerChildren: 0.1,
            repeat: Infinity,
            repeatDelay: 1,
          },
          // opacity: { duration: 1 },
          opacity: { type: "tween", duration: 0, bounce: 0.5 },
        },
      };
    },
  };
  return (
    <motion.svg
      width={size.width}
      height={size.height}
      style={
        {
          // background: "conic-gradient(from 180deg, green, orange, red)",
          // background: "black",
        }
      }
      viewBox={`0 0 ${size.width} ${size.height}`}
      onClick={handleClicked}
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
        custom={3}
        // fill="red"
        // d="M415,275Q422,310,417.5,354Q413,398,378,423Q343,448,299,423Q255,398,227.5,389.5Q200,381,151,401.5Q102,422,86,383.5Q70,345,65,309.5Q60,274,78.5,243.5Q97,213,87.5,176.5Q78,140,107.5,122Q137,104,160.5,74Q184,44,222,33Q260,22,293.5,43.5Q327,65,362,81Q397,97,386,142.5Q375,188,391.5,214Q408,240,415,275Z"
        d={state.animationPath}
        onAnimationStart={() => {
          console.log("onAnimationStart");
        }}
        onAnimationIteration={(evt) => {
          console.log("onAnimationIteration", evt);
        }}
        onAnimationEnd={() => {
          console.log("onAnimationComplete end");
          controls.stop();
        }}
        onAnimationComplete={() => {
          console.log("onAnimationComplete end");
          controls.stop();
        }}
        onAnimationIterationCapture={(evt) => {
          console.log("onAnimationIterationCapture", evt);
        }}
      />
    </motion.svg>
    // </div>
  );
}
