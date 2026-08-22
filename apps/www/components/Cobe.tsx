"use client";

import { useCobe } from "../hooks/useCobe";

type CobeProps = {
	locations: {
		lat: number;
		lng: number;
	}[];
};

export function Cobe({ locations }: CobeProps) {
	const [canvasRef] = useCobe(locations);

	return (
		<div className="flex relative size-150 overflow-hidden items-center justify-center">
			<canvas ref={canvasRef} className="size-150 object-center" />
		</div>
	);
}
