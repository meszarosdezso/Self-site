import React from "react"
import "./Home.scss"
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar"
import { useTheme } from "../../Providers/theme_provider"
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher"
import useFetch from "../../Hooks/useFetch"
import Loading from "../Loading/Loading"

const Home: React.FC = props => {
  const { accentColor, primaryColor, primaryColorDark, textColor } = useTheme()

  const { data, loading } = useFetch(
    "https://api.github.com/users/meszarosdezso"
  )

  return loading ? (
    <Loading />
  ) : (
    <div className='Home'>
      <CircularAvatar url={data!["avatar_url"]} alt={"Profile image"} />
      <ThemeSwitcher />
      <h1 className='name' style={{ color: accentColor }}>
        {data!["name"]}
      </h1>
      <div className='color-info'>
        <h2 style={{ color: primaryColor }}>Primary color: {primaryColor}</h2>
        <h2 style={{ color: textColor }}>
          Background color: {primaryColorDark}
        </h2>
        <h2 style={{ color: accentColor }}>Accent color: {accentColor}</h2>
      </div>
    </div>
  )
}

export default Home
