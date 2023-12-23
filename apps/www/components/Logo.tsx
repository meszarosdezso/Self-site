'use client'

import { Logo as LogoSVG } from '@md/ui'
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'

export function Logo() {
  const { scrollYProgress } = useScroll()
  const yOffset = useTransform(scrollYProgress, [0, 1], [54, 80])
  const objectPosition = useMotionTemplate`50% ${yOffset}%`

  return (
    <div className="relative overflow-hidden bg-white dark:bg-black mix-blend-multiply dark:mix-blend-screen w-max mx-auto">
      <div className="w-[32vw] min-w-[240px]">
        <LogoSVG
          strokeWidth={2}
          className="text-black stroke-white dark:text-white dark:stroke-black"
        />
      </div>

      <motion.img
        style={{ objectPosition }}
        initial={{ scale: 3, rotateZ: 0 }}
        animate={{ scale: 1.23, rotateZ: '-4deg' }}
        transition={{ duration: 15 }}
        src="https://meszarosdezso.com/assets/instagram_6.jpg"
        className="absolute w-full h-full object-cover opacity-100 top-0
        mix-blend-screen contrast-125 saturate-0 hue-rotate-15 dark:mix-blend-multiply dark:brightness-125 brightness-125"
      />
    </div>
  )
}
