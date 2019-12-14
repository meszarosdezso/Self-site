export const rangeMap = (
  x: number,
  a: number,
  b: number,
  c: number,
  d: number
): number => ((x - a) / (b - a)) * (d - c) + c

export const colorWithOpacity = (color: string, val: number) => {
  const hexVal = rangeMap(val, 0, 1, 0, 15).toString(16)[0]
  return `${color}${hexVal}${hexVal}`
}

export const validatePassword = (password: string): boolean => {
  const regex = /^.*(?=.{8,})((?=.*){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
  return regex.test(password)
}

export function objectToArray<T>(object: { [key: string]: T }): Array<T> {
  const array: T[] = []
  for (const key in object) array.push(object[key])
  return array
}
