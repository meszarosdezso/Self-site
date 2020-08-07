export const isBrowser = () => !(typeof window === "undefined")

export const useWindow = () => {
  return {
    innerWidth: isBrowser() ? innerWidth : 0,
    innerHeight: isBrowser() ? innerHeight : 0,
  }
}
