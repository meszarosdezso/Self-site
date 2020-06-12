import "./ImDoing.scss"
import { useTheme } from "../../providers/theme.provider"
import { useState } from "react"
import Link from "next/link"
import { colorWithOpacity } from "../../utils/colors"

const areas = [
  { link: "/works?fields=photography", name: "photography" },
  { link: "/works?fields=web-development", name: "web development" },
  { link: "/works?fields=app-development", name: "app development" },
  { link: "/works?fields=ui-ux", name: "UI/UX" },
]

const ImDoing: React.FC = () => {
  const { accentColor, backgroundColor, textColor, isDark } = useTheme()
  const [activeArea, setActiveArea] = useState(-1)

  return (
    <div className="ImDoing">
      <h1 className="mono">I am doing</h1>
      <div style={{ backgroundColor }} className="areas">
        {areas.map((area, i) => (
          <h4
            onMouseOver={(_) => setActiveArea(i)}
            onMouseLeave={(_) => setActiveArea(-1)}
            style={{
              mixBlendMode: activeArea === i ? "normal" : "luminosity",
              color:
                activeArea === i
                  ? accentColor
                  : isDark
                  ? colorWithOpacity(textColor, 0.3)
                  : "#0005",
            }}
            key={`area-${i}`}
          >
            <Link href={area.link}>
              <a>{area.name}</a>
            </Link>
          </h4>
        ))}
      </div>
      <Link href={"/works"}>
        <button
          style={{ backgroundColor: accentColor, borderRadius: ".5rem" }}
          className="check-my-works"
        >
          Check out my works
        </button>
      </Link>
    </div>
  )
}

export default ImDoing
