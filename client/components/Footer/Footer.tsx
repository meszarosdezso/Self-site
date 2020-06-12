import AC from "../Ac/Ac"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import "./Footer.scss"

export default function Footer() {
  return (
    <footer id="Footer">
      <h4>
        Design <AC>&</AC> code by... guess one
      </h4>
      <a
        title="Edit this page on GitHub"
        href="https://github.com/meszarosdezso/Self-site.git"
      >
        <FontAwesomeIcon size="2x" icon={faGithub} />
      </a>
      <h4>
        All rights reserved <AC>©</AC> 2020
      </h4>
    </footer>
  )
}
