import { createContext, useContext, useEffect, useState } from "react"
import { rangeMap } from "../utils/math"
import { isBrowser } from "../utils/window"

const ScrollContext = createContext<{
  scrollPx: number
  scrollPercent: number
}>({ scrollPx: 0, scrollPercent: 0 })

const ScrollProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(0)

  useEffect(() => {
    if (window)
      window.addEventListener("scroll", (_) => setState((__) => window.scrollY))
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        scrollPx: state,
        scrollPercent: isBrowser()
          ? rangeMap(
              state,
              0,
              document.documentElement.scrollHeight - window.innerHeight,
              0,
              100
            )
          : 0,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)

export default ScrollProvider
