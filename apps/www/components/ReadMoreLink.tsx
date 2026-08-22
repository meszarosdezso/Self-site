import clsx from "clsx";
import Link from "next/link";
import { ArrowRight } from "react-feather";

export function ReadMoreLink() {
	return (
		<Link
			href="/about"
			className="inline-flex relative group/read-more items-center gap-2"
		>
			<span className="underline opacity-0 group-hover/read-more:opacity-100 transition-all">
				Read more
			</span>
			<span
				className={clsx(
					"absolute inset-y-0 transition-all bg-midnight",
					"left-0 right-0 group-hover/read-more:left-full",
				)}
			></span>
			<ArrowRight className="h-6 group-hover/read-more:delay-[10] transition-all absolute opacity-100 group-hover/read-more:opacity-0 left-0 z-10 group-hover/read-more:left-[105%] inline-flex" />
		</Link>
	);
}
