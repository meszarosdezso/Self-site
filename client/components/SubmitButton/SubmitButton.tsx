import './SubmitButton.scss'
import { Send } from 'react-feather'

export type SubmitState = 'SENDING' | 'READY' | 'ERROR' | 'SENT'

type Props = {
  state: SubmitState
}

const SubmitButton: React.FC<Props> = ({ state }) => {
  return (
    <button
      disabled={state !== 'READY'}
      className={`SubmitButton sans ${state}`}
      type="submit"
    >
      <Send />
      {state === 'SENT'
        ? 'Thanks for your message!'
        : state === 'READY'
        ? 'Make it fly'
        : ''}
    </button>
  )
}

export default SubmitButton
