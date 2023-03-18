import styles from './Footer.module.scss'
import { GitHub } from 'react-feather'

type Props = {
  centered?: boolean
  noPadding?: boolean
  hideGithub?: boolean
}

const Footer: React.FC<Props> = ({ centered, noPadding, hideGithub }) => {
  return (
    <footer
      style={{ justifyContent: centered ? 'center' : 'space-between' }}
      id={styles.Footer}
      className={noPadding ? styles['no-padding'] : ''}
    >
      <p id={styles.copyright}>
        Design, code and rights reserved by Dezso Meszaros
      </p>

      {!centered && !hideGithub && (
        <a
          title="Edit this page on Github"
          href="https://github.com/meszarosdezso/Self-site.git"
          target="_blank"
          className={styles.github}
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
      )}
    </footer>
  )
}

export default Footer
