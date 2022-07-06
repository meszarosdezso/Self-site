export const isBrowser = () => !(typeof window === 'undefined')

export const useWindowSize = () => {
  const isB = isBrowser()
  return {
    width: isB ? innerWidth : 0,
    height: isB ? innerHeight : 0,
  }
}

export const isMobile = () =>
  isBrowser()
    ? /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    : false
