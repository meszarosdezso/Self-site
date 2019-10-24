import React, { useEffect, useState } from "react"
import "./App.scss"
import CircularAvatar from "./Components/CircularAvatar/CircularAvatar"

const App: React.FC = () => {
  const [profile, setProfile] = useState({ name: "", imageUrl: "" })

  useEffect(() => {
    fetch("https://api.github.com/users/meszarosdezso")
      .then(res => res.json())
      .then(data =>
        setProfile({ imageUrl: data["avatar_url"], name: data["name"] })
      )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CircularAvatar url={profile.imageUrl} alt={"Profile image"} />
        <br />
        <h2 style={{ color: "#63a0b1" }}>{profile.name}</h2>
      </header>
    </div>
  )
}

export default App
