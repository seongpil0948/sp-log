"use client";
import clsx from "clsx";
import { motion } from "framer-motion";
import styles from "../styles.module.css";
import { title } from "@/components/server-only/primitives";

export function HeaderAbout(props: { title: string }) {
  return (
    <motion.h2
      className={clsx(
        styles.h2,
        title({ size: "lg", fullWidth: true }),
        "mb-7"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, duration: 1.5 }}
    >
      {props.title}
    </motion.h2>
  );
}