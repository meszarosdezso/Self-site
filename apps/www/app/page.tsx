"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Logo } from "../components/Logo";
import { AnimatedText } from "../components/AnimatedText";
import { useState } from "react";

function Carousel() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [32, 32, 0]);

  const [activeYear, setActiveYear] = useState(2023);

  return (
    <motion.div
      style={{ y, opacity }}
      className="flex h-[80vh] w-[70vw] left-[15vw] absolute"
    >
      <div className="w-1 h-full absolute left-0 inset-y-0 bg-black dark:bg-white/20 text-white">
        <div className="space-y-0 absolute -translate-x-full">
          {[2020, 2021, 2022, 2023].toReversed().map((year) => (
            <div
              onClick={() => setActiveYear(year)}
              className="h-12 cursor-pointer flex items-center translate-x-1 relative justify-center"
              key={year}
            >
              <span
                style={{ opacity: activeYear === year ? 1 : 0.2 }}
                className="mr-4 transition-opacity"
              >
                {year}
              </span>

              {activeYear === year && (
                <motion.div
                  layoutId="active-year-indicator"
                  className="w-1 bg-white h-full absolute right-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <div className="h-screen"></div>
      <motion.div className="h-screen bg-dirt dark:bg-midnight flex text-sm top-0 flex-col justify-center items-center fixed w-full">
        <Logo />

        <motion.div className="absolute translate-y-1/2 right-32 bottom-32 w-max">
          <AnimatedText
            text="UI Engineer, based in Budapest."
            baseDelay={1}
            transition={{ repeatDelay: 5.5 }}
          />

          <AnimatedText
            text="Currently at UX Studio"
            baseDelay={7}
            transition={{ repeatDelay: 5.5 }}
            className="absolute right-0 top-0"
          />
        </motion.div>

        <Carousel />
      </motion.div>

      <div className="p-6 pointer-events-none z-10 h-60 relative text-sm font-display rounded-lg m-10 mt-0"></div>
    </main>
  );
}
