import React from "react"
import "./CircularAvatar.scss"

const CircularAvatar: React.FC<CircularAvatarProps> = ({
  url,
  alt,
  size = 200
}) => {
  return (
    <div className="Circular-avatar" style={{ width: size, height: size }}>
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
