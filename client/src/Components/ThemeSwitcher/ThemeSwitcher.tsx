import React, { useContext } from "react"
import "./ThemeSwitcher.scss"
import { Themes, ThemeContext } from "../../Providers/theme_provider"
import { Theme } from "../../Models/Theme"

const ThemeSwitcher: React.FC = props => {
  const { setTheme } = useContext(ThemeContext)

  return (
    <div className='ThemeSwitcher'>
      {Object.keys(Themes).map((key: string) => (
        <button
          style={{ background: Themes[key as "LIME"].accentColor }}
          key={key}
          onClick={e => setTheme(Themes[key as "LIME"] as Theme)}
        >
          {key}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
