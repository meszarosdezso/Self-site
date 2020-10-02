import { Moon, Sun } from "react-feather"
import "./LightSwitch.scss"
import { useState, useEffect } from "react"

const LightSwitch: React.FC = () => {
  const [state, setState] = useState<"dark" | "light">("light")

  useEffect(() => {
    const newState = localStorage.getItem("md-theme-mode")

    if (newState === "dark") {
      setState(newState)
      document.documentElement.setAttribute("data-theme", newState)
    }
  }, [])

  const handleChange = (_: React.MouseEvent) => {
    const newState = state === "dark" ? "light" : "dark"

    setState(newState)
    document.documentElement.setAttribute("data-theme", newState)
    localStorage.setItem("md-theme-mode", newState)
  }

  return (
    <div id="LightSwitch" onClick={handleChange}>
      {state === "dark" ? <Moon /> : <Sun />}
    </div>
  )
}

export default LightSwitch
