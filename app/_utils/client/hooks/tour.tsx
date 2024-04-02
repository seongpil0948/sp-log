"use client";
import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import { init } from "next/dist/compiled/webpack/webpack";
import { CSSProperties, useRef, useState } from "react";

const Z_INDEX = {
  overlay: 1000,
  target: 1001,
};
export default function useTour() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isOverlay, setIsOverlay] = useState(false);

  const onOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.style.display = "block";
      setIsOverlay(true);
    }
  };

  const offOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
      setIsOverlay(false);
    }
  };

  const overlayStyle: CSSProperties = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: Z_INDEX.overlay,
    display: isOverlay ? "block" : "none",
    overflow: "clip",
    // animationName: "animatetop",
    // animationDuration: "2s"
  };

  return { overlayRef, onOverlay, offOverlay, overlayStyle, isOverlay };
}

export const TargetWrapper = (props: {
  children: React.ReactNode;
  className?: string;
  animate: "initial" | "pulse";
}) => {
  const cls = clsx(" w-fit m-auto", props.className);
  return (
    <motion.div
      initial="initial"
      variants={{
        initial: {
          boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
        },
        pulse: {
          boxShadow: [
            "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
            "0px 0px 10px 10px rgba(0, 0, 0, 0.5)",
            "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
          ],
        },
      }}
      className={cls}
      animate={props.animate}
      style={{ zIndex: Z_INDEX.target }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {props.children}
    </motion.div>
  );
};