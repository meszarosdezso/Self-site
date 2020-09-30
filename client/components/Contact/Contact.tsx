import './Contact.scss'
import { useState } from 'react'
import SubmitButton, { SubmitState } from '../SubmitButton/SubmitButton'
import Social from '../Social/Social'
import { isEmailValid } from '../../utils/validation'
import {
  INVALID_EMAIL,
  INVALID_NAME,
  NO_SUBJECT,
  NO_MESSAGE,
} from '../../constants/error'
import axios from 'axios'

type Props = {}

type FormState = {
  fullName: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC<Props> = () => {
  const [submitState, setSubmitState] = useState<SubmitState>('READY')
  const [error, setError] = useState<string>('')

  const [state, setState] = useState<FormState>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })

  const isFormValid = () => {
    if (!isEmailValid(state.email)) {
      setError(INVALID_EMAIL)
      return false
    }

    if (!state.fullName.trim()) {
      setError(INVALID_NAME)
      return false
    }

    if (!state.subject.trim()) {
      setError(NO_SUBJECT)
      return false
    }

    if (!state.message.trim()) {
      setError(NO_MESSAGE)
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('SENDING')

    if (!isFormValid()) return setSubmitState('ERROR')

    await new Promise(res => setTimeout(res, 2000))

    try {
      await axios.post(
        '/api/send',
        { ...state },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    } catch (e) {
      setSubmitState('ERROR')
      return setError('Oops, something really bad happened...')
    }

    setSubmitState('SENT')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError('')
    setSubmitState('READY')
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div className="Contact">
      <h3 id="contact" className="sans">
        and of course
      </h3>
      <h1> the contact form</h1>
      <Social />

      <form onSubmit={handleSubmit} id="ContactForm">
        <label htmlFor="fullName">Hey, my name is </label>
        <input
          onChange={handleChange}
          value={state.fullName}
          type="text"
          name="fullName"
        />
        , &nbsp;<label htmlFor="email">my email is </label>
        <input
          onChange={handleChange}
          value={state.email}
          type="email"
          name="email"
        />
        <label htmlFor="subject"> and I'm wrinting in connection of a</label>
        <input
          onChange={handleChange}
          value={state.subject}
          type="text"
          name="subject"
        />
        .<br />
        <textarea
          onChange={handleChange}
          value={state.message}
          name="message"
          rows={3}
          placeholder="Type your message here..."
        ></textarea>
        <h4 className="error sans">{error}&nbsp;</h4>
        <SubmitButton state={submitState} />
      </form>
    </div>
  )
}

export default Contact
