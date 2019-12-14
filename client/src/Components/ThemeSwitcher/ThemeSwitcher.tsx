import React, { useContext } from "react"
import "./ThemeSwitcher.scss"
import {
  Themes,
  ThemeContext,
  AccentColors
} from "../../Providers/theme_provider"
import { ThemeSwitcherButtonStyle } from "../../Themes/Buttons"
import { colorWithOpacity } from "../../Functions"

const ThemeSwitcher: React.FC = props => {
  const { setTheme, theme } = useContext(ThemeContext)

  return (
    <div className='ThemeSwitcher'>
      {Object.keys(AccentColors).map((key: string) => (
        <button
          style={{
            ...ThemeSwitcherButtonStyle,
            background: "none",
            color:
              theme.accentColor === AccentColors[key as "LIME"]
                ? theme.accentColor
                : colorWithOpacity(theme.textColor, 0.4)
          }}
          key={key}
          onClick={e =>
            setTheme({ ...theme, accentColor: AccentColors[key as "LIME"] })
          }
        >
          {key}
        </button>
      ))}
      <br />
      {Object.keys(Themes).map((key: string) => (
        <button
          style={{
            ...ThemeSwitcherButtonStyle,
            background: "none",
            color:
              Themes[key as "DARK"].textColor === theme.textColor
                ? theme.textColor
                : colorWithOpacity(theme.textColor, 0.3)
          }}
          key={key}
          onClick={e => setTheme({ ...theme, ...Themes[key as "DARK"] })}
        >
          {key}
        </button>
      ))}
    </div>
  )
}

export default ThemeSwitcher
