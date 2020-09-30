import './Footer.scss'
import { GitHub } from 'react-feather'

type Props = {
  centered?: boolean
}

const Footer: React.FC<Props> = ({ centered }) => {
  return (
    <footer
      style={{ justifyContent: centered ? 'center' : 'space-between' }}
      id="Footer"
    >
      <p id="copyright">All rights reserved © Dezso Meszaros</p>
      {!centered && (
        <a
          title="Edit this page on Github"
          href="https://github.com/meszarosdezso/Self-site.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHub />
        </a>
      )}
    </footer>
  )
}

export default Footer
