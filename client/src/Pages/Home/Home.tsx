import React from "react"
import "./Home.scss"
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar"
import { useTheme } from "../../Providers/theme_provider"
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher"
import TextChanger from "../../Components/TextChanger/TextChanger"
import { useProfile } from "../../Providers/profile_provider"

const Home: React.FC = () => {
  const { accentColor, primaryColor, primaryColorDark, textColor } = useTheme()

  const profile = useProfile()

  return (
    <div className='Home section'>
      <a
        href='https://instagram.com/meszarosdezso'
        target='_blank'
        rel='noopener noreferrer'
        className='avatar'
      >
        <CircularAvatar url={profile.imageUrl || "../../Assets/profile.jpg"} />
      </a>
      <ThemeSwitcher />
      <div className='name-and-texts'>
        <h1 className='name' style={{ color: accentColor }}>
          {profile.name || "Dezso Meszaros"}
        </h1>
        <TextChanger
          texts={["Front-end development"]}
          textStyle={{ color: primaryColor, opacity: 0.4 }}
        />
      </div>
      <div className='color-info'>
        <h2 style={{ color: textColor }}>
          Background color: {primaryColorDark}
        </h2>
        <h2 style={{ color: accentColor }}>Accent color: {accentColor}</h2>
      </div>
    </div>
  )
}

export default Home
