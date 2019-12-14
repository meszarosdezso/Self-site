import React, { createContext, useState, useContext } from "react"
import { Theme } from "../Models/Theme"

export const Themes = {
  FUCSIA: {
    accentColor: "rgb(213, 0, 68)",
    primaryColor: "#4E738B",
    primaryColorDark: "rgb(12, 19, 25)"
  },
  AMBER: {
    accentColor: "rgb(213, 170, 68)",
    primaryColor: "#4E738B",
    primaryColorDark: "rgb(12, 19, 25)"
  },
  LIME: {
    accentColor: "rgb(200, 255, 20)",
    primaryColor: "#4E738B",
    primaryColorDark: "rgb(12, 19, 25)"
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
  const [theme, setTheme] = useState<Theme>(Themes.FUCSIA)

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext).theme

export default ThemeProvider
