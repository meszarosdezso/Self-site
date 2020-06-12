import { useTheme } from "../../providers/theme.provider"
import AC from "../Ac/Ac"
import "./MovingHeader.scss"
import { useState } from "react"
import { useScroll } from "../../providers/scroll.provider"
import { isBrowser } from "../../utils/window"
import { rangeMap } from "../../utils/math"

const MovingHeader: React.FC<{ image: string; title: string }> = ({
  image,
  title,
  children,
}) => {
  const [{ startX, startY }, setStart] = useState({ startX: 0, startY: 0 })
  const [{ x, y }, setOffset] = useState({ x: 0, y: 0 })
  const { backgroundColor } = useTheme()
  const { scrollPx } = useScroll()

  const posY = isBrowser()
    ? rangeMap(scrollPx, 0, document.documentElement.scrollHeight, 0, 200)
    : 0

  const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
    setOffset((_) => ({
      x: (startX - clientX) / 10,
      y: (startY - clientY) / 10,
    }))
  }

  return (
    <header
      className="MovingHeader"
      onMouseEnter={(e) => setStart({ startX: e.clientX, startY: e.clientY })}
      onMouseMove={handleMouseMove}
    >
      <h1
        className="title mono"
        style={{
          transform: `translate(${x / 1.5}px, ${y}px)`,
        }}
      >
        {[...title].map((l, i) => {
          return l == "#" ? <AC key={i}>{l}</AC> : l
        })}
      </h1>
      <div
        className="image"
        style={{
          backgroundColor,
          backgroundImage: `url('${image}')`,
          transform: `translate(0px, ${posY * 2}px)`,
          backgroundPosition: `0px ${posY}%`,
        }}
      ></div>
      {children}
    </header>
  )
}

export default MovingHeader
