import './Footer.scss'
import { GitHub } from 'react-feather'

type Props = {}

const Footer: React.FC<Props> = () => {
  return (
    <footer id="Footer">
      <p id="copyright">All rights reserved © Dezso Meszaros</p>
      <a
        title="Edit this page on Github"
        href="https://github.com/meszarosdezso/Self-site.git"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
      </a>
    </footer>
  )
}

export default Footer
