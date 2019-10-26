import React, { useState, useEffect } from "react"
import CircularAvatar from "../../Components/CircularAvatar/CircularAvatar"
import { accentColor } from "../../Themes/Colors"
import "./LandingPage.scss"
import HomePageButton from "../../Components/HomePageButton/HomePageButton"

const LandingPage: React.FC = props => {
  const [profile, setProfile] = useState({ name: "", imageUrl: "" })

  useEffect(() => {
    fetch("https://api.github.com/users/meszarosdezso")
      .then(res => res.json())
      .then(data =>
        setProfile({ imageUrl: data["avatar_url"], name: data["name"] })
      )
  }, [])

  return (
    <div className="LandingPage">
      <CircularAvatar url={profile.imageUrl} alt={"Profile image"} />
      <br />
      <h2 style={{ color: accentColor }}>{profile.name}</h2>
      <div style={{ height: "10rem" }}></div>
      <div className="LandingPage-buttons">
        <HomePageButton title="Programming" margin="1rem" fontSize=".9rem" />
        <HomePageButton title="Photography" margin="1rem" fontSize=".9rem" />
        <HomePageButton title="Film-making" margin="1rem" fontSize=".9rem" />
      </div>
    </div>
  )
}

export default LandingPage
