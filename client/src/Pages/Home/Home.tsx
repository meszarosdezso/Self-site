import React from "react"
import "./Home.scss"
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar"
import { useTheme } from "../../Providers/theme_provider"
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher"
import { useProfile } from "../../Providers/profile_provider"
import Particles from "../../Components/Particles/Particles"
import AC from "../../Components/Ac/Ac"

const Home: React.FC = () => {
  const { accentColor, primaryColorDark, textColor } = useTheme()

  const profile = useProfile()

  return (
    <div className="Home section">
      <a
        href="https://instagram.com/meszarosdezso"
        target="_blank"
        rel="noopener noreferrer"
        className="avatar"
      >
        <CircularAvatar url={profile.imageUrl || "../../Assets/profile.jpg"} />
      </a>
      <ThemeSwitcher />
      <div className="particle-canvas">
        <Particles />
      </div>
      <div className="name-and-texts">
        <h1 className="name sans">
          <AC>{profile.name}</AC>
        </h1>
        <div id="biography">
          {profile.bio.split(". ").map(line => (
            <p>{line}</p>
          ))}
        </div>
      </div>
      <div className="color-info">
        <h2 style={{ color: textColor }}>
          Background color: {primaryColorDark}
        </h2>
        <h2 style={{ color: accentColor }}>Accent color: {accentColor}</h2>
      </div>
    </div>
  )
}

export default Home
