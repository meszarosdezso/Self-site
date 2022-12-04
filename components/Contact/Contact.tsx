import styles from './Contact.module.scss'
import Social from '../Social/Social'

type Props = {}

const Contact: React.FC<Props> = () => {
  return (
    <div className={styles.Contact}>
      <h1>find me here</h1>
      <Social />
    </div>
  )
}

export default Contact
