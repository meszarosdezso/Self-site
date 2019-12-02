import React from "react"
import "./CircularAvatar.scss"
import { accentColor } from "../../Themes/Colors"

const CircularAvatar: React.FC<CircularAvatarProps> = ({
  url,
  alt,
  size = 200
}) => {
  return (
    <div
      className='Circular-avatar'
      style={{
        width: size,
        height: size,
        border: `.5rem solid ${accentColor}`
      }}
    >
      <img src={url} alt={alt} />
    </div>
  )
}

interface CircularAvatarProps {
  url: string
  alt: string
  size?: number
}

export default CircularAvatar
