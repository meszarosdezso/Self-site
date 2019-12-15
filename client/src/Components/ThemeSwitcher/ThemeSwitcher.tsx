import React, { useContext } from "react"
import "./ThemeSwitcher.scss"
import {
  Themes,
  ThemeContext,
  AccentColors
} from "../../Providers/theme_provider"
import { colorWithOpacity } from "../../Functions"

const ThemeSwitcher: React.FC<{ style?: React.CSSProperties }> = ({
  style
}) => {
  const { setTheme, theme } = useContext(ThemeContext)

  return (
    <div className='ThemeSwitcher' style={style}>
      <div className='buttons'>
        <div className='button-group'>
          {Object.keys(AccentColors).map((key: string) => (
            <button
              style={{
                color:
                  theme.accentColor === AccentColors[key as "LIME"]
                    ? theme.accentColor
                    : colorWithOpacity(theme.textColor, 0.3)
              }}
              key={key}
              onClick={e =>
                setTheme({ ...theme, accentColor: AccentColors[key as "LIME"] })
              }
            >
              {key}
            </button>
          ))}
        </div>
        <div className='button-group'>
          {Object.keys(Themes).map((key: string) => (
            <button
              style={{
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
      </div>
    </div>
  )
}

export default ThemeSwitcher
