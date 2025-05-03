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
    <canvas ref={canvasRef} className="w-[600px] h-[600px] aspect-square" />
  );
}
