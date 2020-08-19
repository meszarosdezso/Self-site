import './Contact.scss'
import { useState } from 'react'
import SubmitButton, { SubmitState } from '../SubmitButton/SubmitButton'
import Social from '../Social/Social'

type Props = {}

type FormState = {
  fullName: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC<Props> = () => {
  const [submitState, setSubmitState] = useState<SubmitState>('READY')

  const [state, setState] = useState<FormState>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitState('SENDING')
    await new Promise((res) => setTimeout(res, 5000))
    setSubmitState('SENT')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log(e.target.name)
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div className="Contact">
      <h3 className="sans">/// &nbsp;and of course,</h3>
      <h1> the contact form</h1>
      <Social />

      <form id="ContactForm" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={state.fullName}
          type="text"
          name="fullName"
          placeholder="Your full name"
        />
        <input
          onChange={handleChange}
          value={state.email}
          type="text"
          name="email"
          placeholder="Your email"
        />
        <input
          onChange={handleChange}
          value={state.subject}
          type="text"
          name="subject"
          placeholder="Topic of your message"
        />
        <textarea
          onChange={handleChange}
          value={state.message}
          name="message"
          rows={5}
          placeholder="Your message"
        ></textarea>
        <SubmitButton state={submitState} />
      </form>
    </div>
  )
}

export default Contact
