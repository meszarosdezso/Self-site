import React from "react"
import { primaryButton } from "../../Themes/ButtonTheme"

const HomePageButton: React.FC<HomePageButtonProps> = ({
  title,
  margin,
  fontSize
}) => {
  return (
    <button
      className="HomePageButton"
      style={{ ...primaryButton, margin, fontSize }}>
      {title}
    </button>
  )
}

export default HomePageButton

interface HomePageButtonProps {
  title: string
  margin?: string
  fontSize?: string
}
