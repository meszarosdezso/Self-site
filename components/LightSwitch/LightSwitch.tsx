import { Moon, Sun } from 'react-feather'
import styles from './LightSwitch.module.scss'
import { useState, useEffect, DetailedHTMLProps, HTMLAttributes } from 'react'

const LightSwitch: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ id }) => {
  const [state, setState] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const newState = localStorage.getItem('md-theme-mode')

    if (newState === 'light') {
      setState(newState)
      document.documentElement.setAttribute('data-theme', newState)
    }
  }, [])

  const handleChange = (_: React.MouseEvent) => {
    const newState = state === 'dark' ? 'light' : 'dark'

    setState(newState)
    document.documentElement.setAttribute('data-theme', newState)
    localStorage.setItem('md-theme-mode', newState)
  }

  return (
    <div id={id || styles.LightSwitch} onClick={handleChange}>
      {state === 'dark' ? <Moon /> : <Sun />}
    </div>
  )
}

export default LightSwitch
