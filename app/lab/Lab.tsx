/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Variants, motion, useAnimationControls } from "framer-motion";
import { useState, MouseEvent, useRef, use, useEffect } from "react";
import { useWindowSize } from "../_utils/client/responsive";
import "./style.css";
import clsx from "clsx";
import { title } from "@/components/server-only/primitives";
import { Button } from "@nextui-org/button";

type Vec2 = { x: number; y: number };
export default function Lab() {
  const targetRef = useRef<HTMLButtonElement>(null);
  const [state, setState] = useState<{
    clickedPos: Vec2;
    endPos: Vec2;
    pathList: Vec2[];
    animationPath: string;
  }>({
    endPos: { x: 0, y: 0 },
    clickedPos: { x: 0, y: 0 },
    pathList: [],
    animationPath: "",
  });
  const size = useWindowSize();
  useEffect(() => {
    if (!targetRef.current) return;
    const target = targetRef.current;
    const rect = target.getBoundingClientRect();
    setState((prev) => {
      return {
        ...prev,
        endPos: { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 },
      };
    });
  }, [targetRef.current]);

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
    // controls.set("hidden");
    console.log("clicked");
    handleOpenModal();
    const clickedPos = { x: e.clientX, y: e.clientY };
    const endPos = state.endPos;
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
  };

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
            // staggerChildren: 0.1,
            // repeat: Infinity,
            // repeat: 1,
            // repeatDelay: 1,
          },
          // opacity: { duration: 1 },
          opacity: { type: "tween", duration: 1, bounce: 0.5 },
        },
      };
    },
  };

  const modalRef = useRef<HTMLDivElement>(null);
  const handleOpenModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.style.display = "block";
    }
  };
  const handleCloseModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.style.display = "none";
    }
  };

  return (
    <>
      <div
        className={clsx(
          "w-screen h-screen text-center flex flex-col justify-between"
        )}
        // style={{ zIndex: 1 }}
        onClick={handleClicked}
      >
        <div
          className={title({
            size: "md",
            color: "pink",
          })}
        >
          Lab
        </div>
        <Button
          ref={targetRef}
          onClick={handleCloseModal}
          style={{ zIndex: 1 }}
          className={clsx(
            "target",
            title({
              size: "sm",
              color: "primary",
              fullWidth: false,
            })
          )}
        >
          I am a target
        </Button>
      </div>
      <div id="myModal" ref={modalRef} className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>Some text in the Modal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div>
      <motion.svg
        width={size.width}
        height={size.height}
        style={{
          position: "fixed",
          top: 0,
          // zIndex: 4,
          pointerEvents: "none",
          // background: "conic-gradient(from 180deg, green, orange, red)",
          // background: "black",
        }}
        viewBox={`0 0 ${size.width} ${size.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="yellow" />
            <stop offset="50%" stopColor="blue" />
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
          onAnimationIteration={(evt) => {
            console.log("onAnimationIteration", evt);
          }}
          onAnimationEnd={() => {
            console.log("onAnimationComplete end");
            controls.stop();
          }}
          onAnimationComplete={() => {
            console.log("onAnimationComplete end");
            controls.set("hidden");
          }}
          onAnimationIterationCapture={(evt) => {
            console.log("onAnimationIterationCapture", evt);
          }}
        />
      </motion.svg>
    </>
  );
}
