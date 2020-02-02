import React, { useState, useEffect } from "react"
import "./Offer.scss"
import { useTheme } from "../../Providers/theme_provider"
import AC from "../Ac/Ac"
import { colorWithOpacity } from "../../Functions"
import axios from "axios"
import { BASE_URL } from "../.."

const Offer: React.FC = props => {
  const [state, setState] = useState(true)
  const [clickedMe, setClickedMe] = useState(false)
  const { accentColor, isDark } = useTheme()
  const [votes, setVotes] = useState({ trues: 0, falses: 0 })

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
    if (vote) setVotes({ ...votes, trues: votes.trues + 1 })
    else setVotes({ ...votes, falses: votes.falses + 1 })
    const { data } = await axios.get("https://ipapi.co/json/")
    const { ip } = data
    await axios.post(`${BASE_URL}/api/vote`, { ip, vote })
    setVotes(await getVotes())
  }

  useEffect(() => {
    getVotes().then(setVotes)
  }, [])

  const getVotes = async () => {
    const votes = await axios.get(`${BASE_URL}/api/vote`).then(res => res.data)
    const myVote = await axios.get(
      `${BASE_URL}/api/vote/${
        (await axios.get("https://ipapi.co/json/")).data.ip
      }`
    )
    setState(myVote.data)
    return votes
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
          onClick={_ => handleVote(true)}
          className={`option ${state ? "active" : ""}`}
        >
          Yes ({votes.trues})
        </h3>
        <h3
          style={{
            color: !state ? accentColor : colorWithOpacity(accentColor, 0.7)
          }}
          onClick={e => handleVote(false)}
          className={`option ${state ? "" : "active"}`}
        >
          No ({votes.falses})
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
