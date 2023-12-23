import { Transition, motion } from 'framer-motion'

type AnimatedTextProps = {
  text: string
  baseDelay?: number
  transition?: Transition
  className?: string
}

export function AnimatedText({
  text,
  baseDelay = 0,
  transition,
  className,
}: AnimatedTextProps) {
  return (
    <motion.p className={className}>
      {text.split('').map((word, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: i * 0.02 + baseDelay,
            duration: 0.5,
            ease: 'circOut',

            repeat: 10,
            repeatType: 'mirror',
            repeatDelay: 5.5,
            ...transition,
          }}
          key={word + i}
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
