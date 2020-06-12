import React, { useContext, useState } from "react"
import "./ThemeSwitcher.scss"
import {
  Themes,
  ThemeContext,
  AccentColors,
} from "../../providers/theme.provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPalette, faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const ThemeSwitcher: React.FC<{ style?: React.CSSProperties }> = ({
  style,
}) => {
  const [opened, setOpened] = useState(false)

  const { setTheme, theme } = useContext(ThemeContext)

  return (
    <div
      className="ThemeSwitcher"
      style={style}
      onMouseLeave={(_) => setOpened(false)}
    >
      <div
        style={{
          opacity: opened ? 1 : 0,
          pointerEvents: opened ? "inherit" : "none",
        }}
        className="colors"
      >
        {Object.keys(AccentColors).map((color) => (
          <div
            key={color}
            style={{ background: AccentColors[color as "LIME"] }}
            className="color-dot"
            onClick={(_) =>
              setTheme({
                ...theme,
                accentColor: AccentColors[color as "LIME"],
              })
            }
          ></div>
        ))}
      </div>

      <FontAwesomeIcon
        icon={faPalette}
        id="palette-icon"
        onMouseEnter={(_) => setOpened(true)}
      />

      <FontAwesomeIcon
        icon={theme.isDark ? faMoon : faSun}
        id="light-mode-toggle"
        color={AccentColors["AMBER"]}
        style={{
          opacity: opened ? 1 : 0,
          pointerEvents: opened ? "inherit" : "none",
        }}
        onClick={(_) => {
          theme.isDark
            ? setTheme({
                ...theme,
                ...Themes.LIGHT,
              })
            : setTheme({
                ...theme,
                ...Themes.DARK,
              })
        }}
      />
    </div>
  )
}

export default ThemeSwitcher
