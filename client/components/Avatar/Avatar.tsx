import React from "react"
import "./Avatar.scss"
import { useTheme } from "../../providers/theme.provider"

type AvatarProps = {
  url: string
  size?: number
}

const Avatar: React.FC<AvatarProps> = ({ url, size = 200 }) => {
  const { backgroundColor } = useTheme()

  return (
    <div
      className="Avatar"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${url})`,
        backgroundColor: backgroundColor,
      }}
    ></div>
  )
}

export default Avatar
