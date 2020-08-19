import './Social.scss'
import { GitHub, Instagram, Phone } from 'react-feather'

type Props = {}

const Social: React.FC<Props> = () => {
  return (
    <div className="Social sans">
      <a
        className="social"
        href="https://github.com/meszarosdezso"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub />
        <span className="value">meszarosdezso</span>
      </a>
      <a
        className="social"
        href="https://instagram.com/meszarosdezso"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Instagram />
        <span className="value">meszarosdezso</span>
      </a>
      <a className="social">
        <Phone />
        <span className="value">+36 30 839 6751</span>
      </a>
    </div>
  )
}

export default Social
