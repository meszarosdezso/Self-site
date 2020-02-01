import React, { useState } from "react"
import "./Offer.scss"
import { useTheme } from "../../Providers/theme_provider"
import AC from "../Ac/Ac"
import { colorWithOpacity } from "../../Functions"

const Offer: React.FC = props => {
  const [state, setState] = useState(true)
  const [clickedMe, setClickedMe] = useState(false)
  const { accentColor, isDark } = useTheme()

  const clickMe = (e: React.MouseEvent) => {
    if (!clickedMe) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        setClickedMe(true)
      }, 200)
    }
  }

  return (
    <div
      className="Offer"
      style={{
        backgroundColor: isDark ? "#0001" : "#fff3"
      }}
    >
      <h5 className="flexing">
        Design <AC>&</AC> code by{" "}
        <span
          style={{
            textDecoration: clickedMe ? "none" : "underline",
            cursor: clickedMe ? "inherit" : "pointer"
          }}
          onClick={clickMe}
        >
          {!clickedMe ? "this guy" : "THIS guy"}
        </span>
        {clickedMe ? "  😉" : ""}
      </h5>
      <br />
      <h1 className="question sans">Do you like this website?</h1>
      <div className="options">
        <h3
          style={{
            color: state ? accentColor : colorWithOpacity(accentColor, 0.7)
          }}
          onMouseEnter={_ => setState(true)}
          className={`option ${state ? "active" : ""}`}
        >
          Yes
        </h3>
        <h3
          style={{
            color: !state ? accentColor : colorWithOpacity(accentColor, 0.7)
          }}
          onMouseEnter={_ => setState(false)}
          className={`option ${state ? "" : "active"}`}
        >
          No
        </h3>
      </div>
      <h2>
        Let me make something <AC>{state ? "similar" : "different"}</AC> for
        you!
      </h2>
    </div>
  )
}

export default Offer
