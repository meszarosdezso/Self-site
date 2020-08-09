import "./Nav.scss"
import LightSwitch from "../LightSwitch/LightSwitch"

const Nav: React.FC = () => {
  return (
    <nav id="nav">
      <div id="logo">
        <img src="/logo240.png" alt="logo" />
      </div>

      <div id="contact-btn">
        <h4>Contact</h4>
      </div>

      <LightSwitch />
    </nav>
  )
}

export default Nav
