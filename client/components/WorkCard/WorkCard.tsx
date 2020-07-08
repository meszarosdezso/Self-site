import { Work } from "../../models/work"
import "./WorkCard.scss"
import AC from "../Ac/Ac"
import { rangeMap } from "../../utils/math"
import Link from "next/link"
import { useTheme } from "../../providers/theme.provider"
import { sizedImage } from "../../utils/convert"

const WorkCard: React.FC<{
  work: Work
  index: number
  scrollIndex: number
}> = ({ work, index, scrollIndex }) => {
  const { isDark } = useTheme()
  const detailsVisible = Math.floor(scrollIndex) == index

  const scrollOffset = rangeMap(scrollIndex, index, index + 1, 0, 30)

  return (
    <Link href="/works/:uid" as={`/works/${work.uid}`}>
      <div className="WorkCard">
        <div className="cover">
          <img
            style={{
              transform: `translateY(${scrollOffset}px) scale(1.2)`,
              opacity: isDark ? 0.5 : 0.4,
            }}
            src={sizedImage(work.cover, 1080)}
            alt=""
          />
        </div>
        <div
          style={{
            transform: `translateY(${-scrollOffset}px)`,
          }}
          className={`details ${detailsVisible ? "visible" : ""}`}
        >
          <h2>{work.title}</h2>
          <h4 className="date mono">{work.year}</h4>
          <div className="desc">
            <p>{work.description}</p>
            <div className="tags">
              {work.categories.map((tag) => (
                <div key={tag + work.uid} className="work-tag">
                  <AC>#</AC>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default WorkCard
