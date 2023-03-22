import styles from './LandingPage.module.scss'
import Nav from '../Nav/Nav'
import { useMouse } from '../../utils/useMouse'
import { useEffect, useState } from 'react'
import { GradientTitle } from '../GradientTitle/GradientTitle'

const titles = [
  'UX/UI Developer',
  <span>
    Currently at <br />
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://uxstudioteam.com"
    >
      UX Studio
    </a>
  </span>,
]

const LandingPage: React.FC = () => {
  const { dy } = useMouse()
  const [activeTitle, setActiveTitle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitle(title => (title + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div id={styles.LandingPage}>
      <Nav />

      <div id={styles['name-hero']}>
        <GradientTitle>
          Dezso
          <br />
          Meszaros
        </GradientTitle>
      </div>

      <p className={styles.titles}>
        {titles.map((title, i) => (
          <code
            className={activeTitle === i ? styles.active : ''}
            key={'title-' + i}
          >
            {title}
          </code>
        ))}
      </p>

      <h4
        style={{
          transform: `translate(0, ${dy / 40}px)`,
        }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }}
        id={styles['imadethese']}
      >
        I've made these
      </h4>
    </div>
  )
}

export default LandingPage
