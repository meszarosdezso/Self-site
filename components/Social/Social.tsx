import styles from './Social.module.scss'
import { GitHub, Instagram, Phone } from 'react-feather'

type Props = {
  showLabels?: boolean
}

const SOCIALS = [
  {
    label: 'meszarosdezso',
    link: 'https://github.com/meszarosdezso',
    Icon: GitHub,
  },
  {
    label: 'meszarosdezso',
    link: 'https://instagram.com/meszarosdezso',
    Icon: Instagram,
  },
  {
    label: '+36 30 839 6751',
    link: 'tel:+36308396751',
    Icon: Phone,
  },
]

const Social: React.FC<Props> = ({ showLabels = true }) => {
  return (
    <div className={`${styles.Social} sans`}>
      {SOCIALS.map(({ label, link, Icon }) => (
        <a
          key={link}
          className={styles.social}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon />
          {showLabels && <span className={styles.value}>{label}</span>}
        </a>
      ))}
    </div>
  )
}

export default Social
