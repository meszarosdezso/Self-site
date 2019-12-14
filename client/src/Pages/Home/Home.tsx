import React, { useState, useEffect } from "react"
import "./Home.scss"
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar"
import { useTheme } from "../../Providers/theme_provider"
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher"

const Home: React.FC = props => {
  const [profile, setProfile] = useState({ name: "", imageUrl: "" })

  useEffect(() => {
    fetch("https://api.github.com/users/meszarosdezso")
      .then(res => res.json())
      .then(data =>
        setProfile({ imageUrl: data["avatar_url"], name: data["name"] })
      )
  }, [])

  const { accentColor, primaryColor, primaryColorDark } = useTheme()

  return (
    <div className='Home'>
      <header className='App-header' style={{ background: primaryColorDark }}>
        <CircularAvatar url={profile.imageUrl} alt={"Profile image"} />
        <br />
        <h1 style={{ color: accentColor }}>{profile.name}</h1>
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
        <ThemeSwitcher />
      </header>
    </div>
  )
}

export default Home
