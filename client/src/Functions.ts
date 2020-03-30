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

export function HEX2RGB(hex: string) {
  if (hex.charAt(0) === "#") {
    hex = hex.substr(1)
  }

  var values = hex.split(""),
    r,
    g,
    b

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16)
    g = r
    b = r
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16)
    g = parseInt(values[1].toString() + values[1].toString(), 16)
    b = parseInt(values[2].toString() + values[2].toString(), 16)
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16)
    g = parseInt(values[2].toString() + values[3].toString(), 16)
    b = parseInt(values[4].toString() + values[5].toString(), 16)
  } else {
    return []
  }
  return [r, g, b]
}
