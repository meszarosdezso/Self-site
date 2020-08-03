import "./ContactMe.scss"
import { useTheme } from "../../providers/theme.provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"
import { faPhone, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import axios from "axios"
import { isEmailValid } from "../../utils/validation"
import { colorWithOpacity } from "../../utils/colors"

const ContactMe: React.FC = () => {
  const { accentColor, backgroundColor, textColor } = useTheme()

  const [formState, setFormState] = useState({
    name: "",
    message: "",
    email: "",
  })

  const [status, setStatus] = useState<
    null | "SENDING" | "SENT" | "ERROR" | "INVALID"
  >("INVALID")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
    if (!isEmailValid(formState.email)) setStatus("INVALID")
    else setStatus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status) return
    setStatus("SENDING")
    try {
      await axios.post("/api/send", {
        ...formState,
      })

      setStatus("SENT")
    } catch (e) {
      console.log(e)
      setStatus("ERROR")
    }
  }

  return (
    <div className="ContactMe">
      <div
        className="contact-header"
        style={{
          backgroundImage: "url('bp.jpg')",
          backgroundColor,
        }}
      ></div>
      <h1 style={{ color: accentColor }} className="mono">
        Contact me
      </h1>

      <div className="social-links">
        <a
          className="social"
          href="https://github.com/meszarosdezso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon size="lg" icon={faGithub} />
          <span className="value">meszarosdezso</span>
        </a>
        <a
          className="social"
          href="https://instagram.com/meszarosdezso"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon size="lg" icon={faInstagram} />
          <span className="value">meszarosdezso</span>
        </a>
        <a className="social">
          <FontAwesomeIcon size="lg" icon={faPhone} />
          <span className="value">+36/30 839 6751</span>
        </a>
      </div>

      <div className="contact-form">
        <form onSubmit={handleSubmit}>
          <input
            style={{
              background: colorWithOpacity(textColor, 0.2),
              border: "none", //`${accentColor} 3px solid`,
              borderRadius: ".5rem",
            }}
            type="text"
            name="name"
            id="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your name"
          />
          <input
            style={{
              background: colorWithOpacity(textColor, 0.2),
              border: "none", //`${accentColor} 3px solid`,
              borderRadius: ".5rem",
            }}
            type="text"
            name="email"
            id="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="Your email"
          />
          <textarea
            style={{
              background: colorWithOpacity(textColor, 0.2),
              border: "none", //`${accentColor} 3px solid`,
              borderRadius: ".5rem",
            }}
            placeholder="Your message"
            name="message"
            id="message"
            value={formState.message}
            onChange={handleChange}
            cols={30}
            rows={10}
          ></textarea>
          <button
            style={{ backgroundColor: accentColor, borderRadius: ".5rem" }}
            type="submit"
          >
            {status === "INVALID" ? (
              "Email is not valid"
            ) : (
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <div
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: status === "SENDING" ? "0rem" : "7rem",
                  }}
                >
                  {status === null
                    ? "Make it fly"
                    : status === "SENT"
                    ? "Email sent"
                    : ""}
                </div>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactMe
