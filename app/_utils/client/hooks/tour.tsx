"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useRef } from "react";

const zIndex = 1000;
export default function useTour() {
  const overlayRef = useRef<HTMLDivElement>(null);

  const onOverlay = () => {
    // controls.start("visible");
    console.info("overlayRef: ", overlayRef.current);
    if (overlayRef.current) {
      overlayRef.current.style.display = "block";
      console.log(
        "overlayRef.current.style.display: ",
        overlayRef.current.style.display
      );
    }
  };

  const offOverlay = () => {
    if (overlayRef.current) {
      overlayRef.current.style.display = "none";
    }
  };

  return { overlayRef, onOverlay, offOverlay };
}
