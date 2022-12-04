import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react'
import styles from './PrimaryButton.module.scss'

export default function PrimaryButton({
  children,
  state = 'READY',
  ...props
}: PropsWithChildren<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { state?: 'READY' | 'ERROR' }
>) {
  return (
    <button
      {...props}
      className={`${styles.PrimaryButton} sans ${styles[state]} ${props.className}`}
      type="submit"
    >
      <div className={styles.shine}></div>
      <div className={styles.content}>{children}</div>
    </button>
  )
}
