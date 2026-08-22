import createGlobe, { type Globe } from "cobe";
import React, { useEffect } from "react";

type Direction = "forward" | "backward" | "up" | "down";

export function useCobe(locations: { lat: number; lng: number }[]) {
	const canvasRef = React.useRef<HTMLCanvasElement>(null);
	const globeRef = React.useRef<Globe | null>(null);
	const pausedRef = React.useRef(false);
	const directionRef = React.useRef<Direction>("forward");
	const speedRef = React.useRef(0.01);
	const thetaRef = React.useRef(0.5);
	const phiRef = React.useRef(4.4);

	React.useEffect(() => {
		if (!canvasRef.current) return;
		const pixelRatio = window.devicePixelRatio;

		globeRef.current = createGlobe(canvasRef.current, {
			devicePixelRatio: pixelRatio,
			width: 600 * pixelRatio,
			height: 600 * pixelRatio,
			phi: phiRef.current,
			theta: thetaRef.current,
			dark: 0.7,
			mapBaseBrightness: 0.1,
			diffuse: 1,
			mapSamples: 12000,
			mapBrightness: 10,
			baseColor: [0.2, 0.2, 0.2],
			markerColor: [0.4, 0.8, 1],
			glowColor: [0.1, 0.1, 0.1],
			markerElevation: 0.001,
			markers: locations
				?.filter((location) => Boolean(location))
				.map((location) => ({
					location: [location.lat, location.lng],
					size: 0.02,
				})),
		});
	}, [locations?.filter]);

	useEffect(() => {
		let frameId: number | null = null;
		const animate = () => {
			if (pausedRef.current) return;
			if (
				directionRef.current === "forward" ||
				directionRef.current === "backward"
			) {
				phiRef.current +=
					directionRef.current === "forward"
						? speedRef.current
						: -speedRef.current;
			} else {
				thetaRef.current +=
					directionRef.current === "up"
						? speedRef.current / 5
						: -speedRef.current / 5;
			}

			globeRef.current?.update({
				theta: thetaRef.current,
				phi: phiRef.current,
			});

			if (frameId) cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(animate);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				speedRef.current = 0.01;
				pausedRef.current = false;
				directionRef.current = "forward";
			} else if (event.key === "ArrowLeft") {
				speedRef.current = 0.01;
				pausedRef.current = false;
				directionRef.current = "backward";
			} else if (event.key === "ArrowUp") {
				speedRef.current = 0.1;
				pausedRef.current = false;
				directionRef.current = "down";
			} else if (event.key === "ArrowDown") {
				speedRef.current = 0.1;
				pausedRef.current = false;
				directionRef.current = "up";
			} else if (event.key === " ") {
				pausedRef.current = !pausedRef.current;
			}
			animate();
		};

		const handleKeyUp = () => {};

		animate();
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);

		return () => {
			if (frameId) {
				cancelAnimationFrame(frameId);
			}
			globeRef.current?.destroy();
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return [canvasRef];
}
