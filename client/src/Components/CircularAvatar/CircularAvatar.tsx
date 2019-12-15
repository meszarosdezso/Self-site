import React from "react"
import "./CircularAvatar.scss"
import { useTheme } from "../../Providers/theme_provider"
import { colorWithOpacity } from "../../Functions"

const CircularAvatar: React.FC<CircularAvatarProps> = ({ url, size = 200 }) => {
  const { accentColor } = useTheme()

  return (
    <div
      className='CircularAvatar'
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
        backgroundColor: colorWithOpacity(accentColor, 0.7)
      }}
    ></div>
  )
}

interface CircularAvatarProps {
  url: string
  size?: number
}

export default CircularAvatar
