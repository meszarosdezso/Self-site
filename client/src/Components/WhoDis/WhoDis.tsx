import React from "react"
import "./WhoDis.scss"
import { useTheme } from "../../Providers/theme_provider"

const WhoDis: React.FC = props => {
  const { accentColor } = useTheme()

  return (
    <div className='WhoDis section'>
      <h1 className='title'>
        Who dis
        <span style={{ fontSize: "2.4rem", color: accentColor }}>?</span>
      </h1>
      <p className='body'>
        Dezso Zoltan Meszaros is a... F*ck this. So I'm a Budapest based
        freelancing web developer and photographer. Currently studying Computer
        Science BA at ELTE University.
      </p>
    </div>
  )
}

export default WhoDis
