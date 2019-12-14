import React, { createContext, useState, useContext, useEffect } from "react"
import { Theme } from "../Models/Theme"

export const AccentColors = {
  FUCSIA: "#d50044",
  AMBER: "#ffcc33",
  LIME: "#bee10f"
}

export const Themes = {
  DARK: {
    primaryColor: "#4E738B",
    primaryColorDark: "#111d25",
    textColor: "#ffffff"
  },
  LIGHT: {
    primaryColor: "#4E738B",
    primaryColorDark: "#eef5ff",
    textColor: "#111d25"
  }
}

interface ThemeContextProps {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextProps>(
  {} as ThemeContextProps
)

const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>({
    ...Themes.DARK,
    accentColor: AccentColors.LIME
  })

  useEffect(() => {
    try {
      setTheme(JSON.parse(localStorage.getItem("theme") || ""))
    } catch {
      console.log("LocalStorage has no cart items yet.")
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext).theme

export default ThemeProvider
