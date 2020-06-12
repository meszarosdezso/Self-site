import Link from "next/link"
import "./About.scss"
import { useTheme } from "../../providers/theme.provider"
import AC from "../Ac/Ac"
import { useScroll } from "../../providers/scroll.provider"
import { rangeMap } from "../../utils/math"
import { isBrowser } from "../../utils/window"

const AboutMe: React.FC = () => {
  const { backgroundColor } = useTheme()
  const { scrollPx } = useScroll()

  const posY = isBrowser()
    ? rangeMap(scrollPx, 0, document.documentElement.scrollHeight, 0, 100)
    : 0

  return (
    <div className="AboutMe section">
      <div
        style={{
          backgroundColor,
          zIndex: -1,
          backgroundImage: "url('little_me.jpg')",
          backgroundPosition: `0px ${posY}%`,
        }}
        id="about-background"
      ></div>
      <h1 className="mono">
        <AC>About me</AC>
      </h1>
      <div className="about-text">
        <p>
          I am a 21 years old freelancing front-end developer and CS student
          from Hungary. I am currently living in Budapest (and looking for a
          flatmate btw).
        </p>
        <AC id="story-link">
          <Link href={"/me"}>
            <a>Read my CV</a>
          </Link>
        </AC>
      </div>
    </div>
  )
}

export default AboutMe
