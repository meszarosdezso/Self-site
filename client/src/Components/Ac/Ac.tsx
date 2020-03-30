import React from "react"
import "./Ac.scss"
import { useTheme } from "../../Providers/theme_provider"

const AC: React.FC = ({ children }) => {
  const { accentColor } = useTheme()
  return <span style={{ color: accentColor }}>{children}</span>
}

export default AC
