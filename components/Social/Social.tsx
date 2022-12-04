import styles from './Social.module.scss'
import { GitHub, Instagram, Linkedin, Phone } from 'react-feather'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

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
    link: 'https://www.linkedin.com/in/meszarosdezso/',
    Icon: Linkedin,
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
] as const

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
          <PrimaryButton>
            <Icon />
            {showLabels && <span>{label}</span>}
          </PrimaryButton>
        </a>
      ))}
    </div>
  )
}

export default Social
