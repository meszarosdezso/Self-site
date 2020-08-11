import "./LandingPage.scss"
import Nav from "../Nav/Nav"
import { useMouse } from "../../utils/useMouse"
import { useScroll } from "../../providers/scroll"
import { rangeMap } from "../../utils/math"

const LandingPage: React.FC = () => {
  const { dx, dy } = useMouse()
  const { scrollPercent } = useScroll()

  return (
    <div id="LandingPage">
      <Nav />
      <h1
        style={{
          transform: `translate(
            ${dx / -20}px,
            ${dy / -20}px
            )`,
        }}
        id="name-hero"
      >
        <div id="cross-line"></div>
        Dezso <span id="z">Z</span>
        <br />
        Meszaros
      </h1>

      <h3>
        Front end
        <br />
        developer
      </h3>

      <h4
        style={{
          transform: `translate(
            0,
            ${dy / 40}px
        )`,
          opacity: rangeMap(scrollPercent, 0, 50, 1, 0),
        }}
        id="imadethese"
      >
        I've made these
      </h4>
    </div>
  )
}

export default LandingPage
