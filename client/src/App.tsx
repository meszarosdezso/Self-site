import React, { useEffect, useState } from "react"
import "./App.scss"
import CircularAvatar from "./Components/CircularAvatar/CircularAvatar"

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    fetch("https://api.github.com/users/meszarosdezso")
      .then(res => res.json())
      .then(data => setImageUrl(data["avatar_url"]))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CircularAvatar url={imageUrl} alt={"Profile image"} />
        <h2 style={{ color: "#63a0b1" }}>Site coming soon ...</h2>
      </header>
    </div>
  )
}

export default App
