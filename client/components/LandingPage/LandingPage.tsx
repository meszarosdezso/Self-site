import "./LandingPage.scss"
import { useEffect, useState } from "react"
import { isBrowser } from "../../utils/window"
import Nav from "../Nav/Nav"

const LandingPage: React.FC = () => {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 })

  useEffect(() => {
    let startX: number, startY: number

    function handleMouseMove({ clientX, clientY }: MouseEvent) {
      if (!startX || !startY) {
        startX = clientX
        startY = clientY
      } else {
        setOffset((_) => ({ dx: clientX - startX, dy: clientY - startY }))
      }
    }

    if (isBrowser()) {
      window.addEventListener("mousemove", handleMouseMove)

      window.addEventListener("touchstart", (_) =>
        window.removeEventListener("mousemove", handleMouseMove)
      )
    }
  }, [typeof window === "undefined"])

  return (
    <div id="LandingPage">
      <Nav />
      <h1
        style={{
          transform: `translate(
            ${dx / -20}px,
            ${dy / -20}px
            )`,
        }}
        id="name-hero"
      >
        <div id="cross-line"></div>
        Dezso <span id="z">Z</span>
        <br />
        Meszaros
      </h1>
      <h4
        style={{
          transform: `translate(
            0,
            ${dy / 40}px
        )`,
        }}
        id="imadethese"
      >
        I've made these
      </h4>
    </div>
  )
}

export default LandingPage
