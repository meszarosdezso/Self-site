"use client";

import { AnimatedText } from "./AnimatedText";

import { motion, useScroll, useTransform } from "framer-motion";

export function Title() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div style={{ opacity }}>
      <div className="relative text-right text-white/60">
        <AnimatedText
          baseDelay={0}
          repeat={10}
          text="UI Engineer, based in Budapest"
        />

        <AnimatedText
          baseDelay={4}
          repeat={9}
          text="Currently at UX Studio"
          className="absolute left-0 top-0"
        />
      </div>
    </motion.div>
  );
}
