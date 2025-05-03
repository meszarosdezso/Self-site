import createGlobe from "cobe";
import React from "react";

type Direction = "forward" | "backward" | "up" | "down";

export function useCobe(locations: { lat: number; lng: number }[]) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const pixelRatio = window.devicePixelRatio;

    let phi = 4.4;
    let theta = 0.5;
    let direction: Direction = "forward";
    let speed = 0.01;
    let paused = false;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: pixelRatio,
      width: 600 * pixelRatio,
      height: 600 * pixelRatio,
      phi,
      theta,
      dark: 0.7,
      mapBaseBrightness: 0.1,
      diffuse: 1,
      mapSamples: 12000,
      mapBrightness: 10,
      baseColor: [0.2, 0.2, 0.2],
      markerColor: [0.4, 0.8, 1],
      glowColor: [0.1, 0.1, 0.1],
      markers: locations
        ?.filter((location) => Boolean(location))
        .map((location) => ({
          location: [location.lat, location.lng],
          size: 0.02,
        })),
      onRender: (state) => {
        if (paused) return;
        if (direction === "forward" || direction === "backward") {
          phi += direction === "forward" ? speed : -speed;
        } else {
          theta += direction === "up" ? speed / 5 : -speed / 5;
        }

        state.theta = theta;
        state.phi = phi;
      },
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        speed = 0.01;
        paused = false;
        direction = "forward";
      } else if (event.key === "ArrowLeft") {
        speed = 0.01;
        paused = false;
        direction = "backward";
      } else if (event.key === "ArrowUp") {
        speed = 0.1;
        paused = false;
        direction = "down";
      } else if (event.key === "ArrowDown") {
        speed = 0.1;
        paused = false;
        direction = "up";
      } else if (event.key === " ") {
        paused = !paused;
      }
    };

    const handleKeyUp = () => {};

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      globe.destroy();
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return [canvasRef];
}
