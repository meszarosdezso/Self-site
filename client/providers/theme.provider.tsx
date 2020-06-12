import React, { createContext, useState, useContext, useEffect } from "react"
import { Theme } from "../models/theme"

export const AccentColors = {
  FUCSIA: "#D50044",
  ORANGE: "#D7481D",
  AMBER: "#FFA000",
  LIME: "#BEE10F",
  MINT: "#41B883",
  ICE: "#34495e",
}

export const Themes = {
  DARK: {
    primaryColor: "#6d9ebd",
    backgroundColor: "#212634",
    textColor: "#FFFFFF",
    isDark: true,
  },
  LIGHT: {
    primaryColor: "#4E738B",
    backgroundColor: "#FAEEE4",
    textColor: "#34495e",
    isDark: false,
  },
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
    accentColor: AccentColors.AMBER,
    isDark: true,
  })

  useEffect(() => {
    try {
      setTheme(JSON.parse(localStorage.getItem("theme") || ""))
    } catch {
      console.log("LocalStorage has no theme set yet.")
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
