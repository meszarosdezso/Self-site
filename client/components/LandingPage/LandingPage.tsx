import "./LandingPage.scss"
import { useEffect, useState } from "react"
import { isBrowser } from "../../utils/window"

// const fields = ["ui/ux", "ios/android", "photography", "front-end"]

const LandingPage: React.FC = () => {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let startX: number, startY: number
    if (isBrowser()) {
      window.addEventListener("mousemove", ({ clientX, clientY }) => {
        if (!startX || !startY) {
          startX = clientX
          startY = clientY
        } else {
          setMouseOffset((_) => ({ x: clientX - startX, y: clientY - startY }))
        }
      })
    }
  }, [typeof window === "undefined"])

  return (
    <div id="LandingPage">
      <div id="logo">
        <img src="/logo240.png" alt="logo" />
      </div>

      <div id="contact-btn">
        <h4>Contact</h4>
      </div>

      {/* <div className="fields">
        {fields.map((field) => {
          return (
            <span className="field" key={field}>
              {field}
            </span>
          )
        })}
      </div> */}

      <h1
        style={{
          transform: `translate(
            ${mouseOffset.x / -20}px,
            ${mouseOffset.y / -20}px
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
            ${mouseOffset.y / 40}px
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
