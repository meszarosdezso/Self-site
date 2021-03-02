import styles from './SubmitButton.module.scss'
import { Send } from 'react-feather'

export type SubmitState = 'SENDING' | 'READY' | 'ERROR' | 'SENT'

type Props = {
  state: SubmitState
}

const SubmitButton: React.FC<Props> = ({ state }) => {
  return (
    <button
      disabled={state !== 'READY'}
      className={`${styles.SubmitButton} sans ${styles[state]}`}
      type="submit"
    >
      <Send />
      {state === 'SENT'
        ? 'Thanks for your message!'
        : state === 'READY'
        ? 'Make it fly'
        : state === 'ERROR'
        ? 'ERROR'
        : ''}
    </button>
  )
}

export default SubmitButton
