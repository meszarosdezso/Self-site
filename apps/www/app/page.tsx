'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Logo } from '../components/Logo'

function Card() {
  return (
    <div className="flex-1 min-w-[300px] flex flex-col justify-end p-8 ring-2 group h-96 overflow-hidden ring-body-dark relative">
      <h1 className="font-display relative z-10 dark:text-white text-black text-3xl">
        Photos
      </h1>
    </div>
  )
}

export default function Page() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [32, 32, 0])

  return (
    <main className="min-h-screen">
      <div className="h-screen"></div>
      <motion.div className="h-screen bg-dirt dark:bg-midnight flex text-sm top-0 flex-col justify-center items-center fixed w-full">
        <Logo />

        <motion.div className="absolute translate-y-1/2 right-32 bottom-32 w-max">
          <motion.p>
            {'UI Engineer, based in Budapest.'.split('').map((word, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: i * 0.02 + 1,
                  duration: 0.5,
                  ease: 'circOut',

                  repeat: 10,
                  repeatType: 'mirror',
                  repeatDelay: 5.5,
                }}
                key={word + i}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.p className="absolute right-0 top-0 whitespace-nowrap">
            {'Currently at UX Studio.'.split('').map((word, i) => (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: i * 0.02 + 7,
                  duration: 0.5,
                  ease: 'circOut',

                  repeat: 10,
                  repeatType: 'mirror',
                  repeatDelay: 5.5,
                }}
                key={word + i}
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          transition={{ staggerChildren: 10 }}
          className="absolute bg-dirt dark:bg-midnight overflow-x-auto py-4 px-20 flex w-full space-x-20"
        >
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </motion.div>
      </motion.div>

      <div className="p-6 pointer-events-none z-10 h-60 relative text-sm font-display rounded-lg m-10 mt-0"></div>
    </main>
  )
}
