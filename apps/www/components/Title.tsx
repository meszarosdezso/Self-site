"use client";

import { AnimatedText } from "./AnimatedText";

import { motion, useScroll, useTransform } from "framer-motion";

export function Title() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="md:absolute left-32 translate-y-1/2 bottom-1/2"
    >
      <div className="relative text-white/60">
        <AnimatedText
          baseDelay={1}
          repeat={10}
          transition={{ repeatDelay: 3.5 }}
          text="UI Engineer, based in Budapest."
        />

        <AnimatedText
          baseDelay={5}
          repeat={9}
          transition={{ repeatDelay: 3.5 }}
          text="Currently at UX Studio"
          className="absolute left-0 top-0"
        />
      </div>
    </motion.div>
  );
}
