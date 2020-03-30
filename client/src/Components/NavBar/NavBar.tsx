import React from "react"
import "./NavBar.scss"

const NavBar: React.FC = props => {
  return (
    <div className='NavBar'>
      <ul>
        <li className='NavBarItem'>My works</li>
        <li className='NavBarItem'>Who dis?</li>
        <li className='NavBarItem'>Reach me</li>
      </ul>
    </div>
  )
}

export default NavBar
