export const rangeMap = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number
): number => ((x - a) / (b - a)) * (d - c) + c
