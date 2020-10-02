export const isBrowser = () => !(typeof window === "undefined")

export const useWindow = () => {
  return {
    innerWidth: isBrowser() ? innerWidth : 0,
    innerHeight: isBrowser() ? innerHeight : 0,
  }
}

export const isMobile = () =>
  isBrowser()
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    : false
