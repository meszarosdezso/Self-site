import { createContext, useContext, useState, useEffect } from "react"
import { isBrowser } from "../utils/window"

type Props = {
  scrollPx: number
  scrollPercent: number
}

const ScrollContext = createContext<Props>({ scrollPercent: 0, scrollPx: 0 })

const ScrollProvider: React.FC = ({ children }) => {
  const [scrollPx, setScrollPx] = useState(0)

  useEffect(() => {
    if (isBrowser()) {
      window.addEventListener("scroll", (_) => {
        setScrollPx(window.scrollY)
      })
    }
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        scrollPx,
        scrollPercent: isBrowser()
          ? (scrollY /
              (document.documentElement.scrollHeight - window.innerHeight)) *
            100
          : 0,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)
export default ScrollProvider
