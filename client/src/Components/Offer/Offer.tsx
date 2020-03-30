import React, { useState } from "react"
import "./Offer.scss"
import AC from "../Ac/Ac"

const Offer: React.FC = props => {
  const [state, setState] = useState(true)
  const [clickedMe, setClickedMe] = useState(false)

  const clickMe = (e: React.MouseEvent) => {
    if (!clickedMe) {
      window.scrollTo(0, 0)
      setTimeout(() => {
        setClickedMe(true)
      }, 200)
    }
  }

  const handleVote = async (vote: boolean) => {
    if (state === vote) return
    setState(vote)
  }

  return (
    <div className="Offer">
      <h5 id="flexing">
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
          onClick={_ => handleVote(true)}
          className={`option ${state ? "active" : ""}`}
        >
          <AC>Yes</AC>
        </h3>
        <h3
          onClick={e => handleVote(false)}
          className={`option ${state ? "" : "active"}`}
        >
          <AC>No</AC>
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
