import styles from './SubmitButton.module.scss'
import { Send } from 'react-feather'
import PrimaryButton from '../PrimaryButton/PrimaryButton'

export type SubmitState = 'SENDING' | 'READY' | 'ERROR' | 'SENT'

type Props = {
  state: SubmitState
}

const SubmitButton: React.FC<Props> = ({ state }) => {
  return (
    <PrimaryButton
      disabled={state !== 'READY'}
      className={`${styles.SubmitButton} sans ${styles[state]}`}
      type="submit"
      state={state as 'READY'}
    >
      <div className={styles.shine}></div>
      <Send />
      {state === 'SENT'
        ? 'Thanks for your message!'
        : state === 'READY'
        ? 'Make it fly'
        : state === 'ERROR'
        ? 'ERROR'
        : ''}
    </PrimaryButton>
  )
}

export default SubmitButton
