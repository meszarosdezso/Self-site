import React, { useEffect, useState } from "react"
import "./App.scss"
import CircularAvatar from "./Components/CircularAvatar/CircularAvatar"
import { accentColor, primaryColorDark, primaryColor } from "./Themes/Colors"

const App: React.FC = () => {
  const [profile, setProfile] = useState({ name: "", imageUrl: "" })

  useEffect(() => {
    fetch("https://api.github.com/users/meszarosdezso")
      .then(res => res.json())
      .then(data =>
        setProfile({ imageUrl: data["avatar_url"], name: data["name"] })
      )
  }, [])

  return (
    <div className='App'>
      <header className='App-header' style={{ background: primaryColorDark }}>
        <CircularAvatar url={profile.imageUrl} alt={"Profile image"} />
        <br />
        <h2 style={{ color: primaryColor }}>{profile.name.split(" ")[0]}</h2>
        <h1 style={{ color: accentColor }}>{profile.name.split(" ")[1]}</h1>
        <br />
        <br />
        <h3 style={{ color: primaryColor }}>Colors:</h3>
        <br />
        <h2 style={{ color: accentColor }}>Accent color: {accentColor}</h2>
        <h2 style={{ color: primaryColor }}>Primary color: {primaryColor}</h2>
        <h2 style={{ color: "white" }}>
          Primary color (dark): {primaryColorDark}
        </h2>
        <br />
        <br />
        <h3 style={{ color: primaryColor }}>Buttons: </h3>
        <br />
        <button
          style={{
            border: "none",
            color: "white",
            padding: ".5rem 1rem",
            margin: "1rem auto",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            background: accentColor
          }}
        >
          Contact me
        </button>
        <button
          style={{
            background: "none",
            border: "none",
            color: accentColor,
            margin: ".1rem 1rem",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
        >
          Check me out
        </button>
      </header>
    </div>
  )
}

export default App
