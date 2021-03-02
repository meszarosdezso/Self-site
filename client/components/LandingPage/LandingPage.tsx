import styles from './LandingPage.module.scss'
import Nav from '../Nav/Nav'
import { useMouse } from '../../utils/useMouse'

const LandingPage: React.FC = () => {
  const { dx, dy } = useMouse()

  return (
    <div id={styles.LandingPage}>
      <Nav />
      <h1
        style={{
          transform: `translate(
            ${dx / -20}px,
            ${dy / -20}px
            )`,
        }}
        id={styles['name-hero']}
      >
        <div id={styles['cross-line']}></div>
        Dezso <span id="z">Z</span>
        <br />
        Meszaros
      </h1>

      <h3>
        <code>
          Front end
          <br />
          developer
        </code>
      </h3>

      <h4
        style={{
          transform: `translate(0, ${dy / 40}px)`,
        }}
        id={styles['imadethese']}
      >
        I've made these
      </h4>
    </div>
  )
}

export default LandingPage
