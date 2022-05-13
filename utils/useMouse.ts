import { useState, useEffect, MutableRefObject } from 'react'
import { isBrowser } from './window'

export function useMouse(ref?: MutableRefObject<HTMLElement | undefined>) {
  const [{ dx, dy }, setD] = useState({ dx: 0, dy: 0 })
  const [{ x, y }, setPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let startX: number, startY: number

    function handleMouseEnter({ clientX, clientY }: MouseEvent) {
      startX = clientX
      startY = clientY
    }

    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      if (startX && startY) {
        setD(_ => ({ dx: clientX - startX, dy: clientY - startY }))
        setPos(_ => ({ x: clientX, y: clientY }))
      }
    }

    if (isBrowser()) {
      if (ref && ref.current) {
        ref.current.addEventListener('mouseenter', handleMouseEnter)
        ref.current.addEventListener('mousemove', handleMouseMove)
      } else {
        document.body.addEventListener('mouseenter', handleMouseEnter)
        document.body.addEventListener('mousemove', handleMouseMove)

        document.body.addEventListener('touchstart', _ =>
          document.body.removeEventListener('mousemove', handleMouseMove)
        )
      }
    }
    return () => {
      ref?.current?.removeEventListener('mouseenter', handleMouseEnter)
      ref?.current?.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mousemove', handleMouseMove)
    }
  }, [typeof window === 'undefined'])

  return { dx, dy, x, y }
}
