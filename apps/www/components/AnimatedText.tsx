"use client";

import clsx from "clsx";
import { Transition, motion } from "framer-motion";

type AnimatedTextProps = {
	text: string;
	baseDelay?: number;
	transition?: Transition;
	className?: string;
	repeat?: number;
};

export function AnimatedText({
	text,
	baseDelay = 0,
	transition,
	className,
	repeat = 10,
}: AnimatedTextProps) {
	return (
		<>
			<motion.p title={text} className={clsx(className, "flex items-baseline")}>
				{text.split("").map((letter, i) => (
					<motion.span
						initial={{ opacity: 0, translateY: 7 }}
						animate={{ opacity: 1, translateY: 0 }}
						transition={{
							delay: i * 0.015 + baseDelay,
							duration: 0.5,
							ease: "circOut",

							repeat,
							repeatType: "mirror",
							repeatDelay: 3.5,
							...transition,
						}}
						key={letter + i}
						className="relative flex"
					>
						{letter === " " ? "\u00A0" : letter}
					</motion.span>
				))}
			</motion.p>
			<span className="sr-only absolute">{text}</span>
		</>
	);
}
