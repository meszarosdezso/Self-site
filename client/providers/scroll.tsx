import { createContext, useContext, useState, useEffect } from 'react'
import { isBrowser } from '../utils/window'

type Props = {
  scrollPx: number
  scrollPercent: number
}

const ScrollContext = createContext<Props>({ scrollPercent: 0, scrollPx: 0 })

const ScrollProvider: React.FC = ({ children }) => {
  const [scrollPx, setScrollPx] = useState(0)

  const handler = (_: Event) => {
    setScrollPx(window.scrollY)
  }

  useEffect(() => {
    if (isBrowser()) {
      console.log('HEY')
      window.addEventListener('scroll', handler)
    }
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const calcScrollPercent = () =>
    isBrowser()
      ? (scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100
      : 0

  return (
    <ScrollContext.Provider
      value={{
        scrollPx,
        scrollPercent: calcScrollPercent(),
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export const useScroll = () => useContext(ScrollContext)

export default ScrollProvider
