"use client";

import clsx from "clsx";
import { motion, Variants } from "framer-motion";
import { sectionCls } from "../theme";
import { paragraph } from "@/components/server-only/primitives";
import { on } from "events";

interface Props {
  emoji: string;
  hueA: number;
  hueB: number;
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
  onHover: { rotate: 0, scale: 1.1, zIndex: 1 },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

function Card({ emoji, hueA, hueB }: Props) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
      whileHover="onHover"
      style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: 20,
        marginBottom: -120,
        width: 500,
        height: 450,
        margin: "auto",
      }}
    >
      <div
        style={{
          background,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          clipPath:
            "path('M 0 33.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')",
        }}
      />
      <motion.div
        className={paragraph({ size: "xs" })}
        style={{
          width: 300,
          height: 430,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "white",
          borderRadius: 20,
          cursor: "pointer",
          boxShadow:
            "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
          transformOrigin: "10% 60%",
        }}
        variants={cardVariants}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

const food: [string, number, number][] = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];

export function DocsSection() {
  const cards = food.map(([emoji, hueA, hueB]) => (
    <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
  ));
  return (
    <section className={clsx(sectionCls, "my-[100] mx-auto pb-[100]")}>
      {cards}
    </section>
  );
}

export default DocsSection;
