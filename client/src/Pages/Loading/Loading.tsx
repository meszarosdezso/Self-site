import React from "react"
import "./Loading.scss"
import { useTheme } from "../../Providers/theme_provider"

const Loading: React.FC = props => {
  const { primaryColor } = useTheme()

  return (
    <div className='Loading'>
      <h1>Welcome to my site!</h1>
      <br />
      <h5 style={{ color: primaryColor }}>Loading contents...</h5>
    </div>
  )
}

export default Loading
