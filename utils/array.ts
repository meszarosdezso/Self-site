export function splitUpArray<T>(arr: T[], chunks: number = 1): T[][] {
  const result: T[][] = []

  for (let i = 0; i < arr.length; i++) {
    const index = i % chunks
    if (!result[index]) result[index] = []
    result[index].push(arr[i])
  }

  return result
}
