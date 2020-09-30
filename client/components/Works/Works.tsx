import './Works.scss'
import { Work } from '../../models/work'
import { MutableRefObject, useRef } from 'react'
import { useScroll } from '../../providers/scroll'
import { isBrowser } from '../../utils/window'
import Link from 'next/link'

const WorkTile: React.FC<{
  work: Work
  firstRef?: MutableRefObject<HTMLDivElement> | null
  visible: boolean
  scrollTop: number
}> = ({ work, firstRef, visible, scrollTop }) => {
  return (
    <div
      ref={firstRef}
      className={`${visible ? 'WorkTile visible' : 'WorkTile'}`}
    >
      <div className="image">
        <img
          style={{
            transform: `translateY(${scrollTop / 3}px) scale(1.2)`,
          }}
          src={work.cover}
          alt={work.title}
        />
      </div>
      <div className="details">
        <h1 className="title">{work.title}</h1>
        <p className="sans description">{work.description}</p>

        <Link as={`/works/${work.uid}`} href="/works/:workId">
          <a>
            <code>Read more</code>
          </a>
        </Link>
      </div>
    </div>
  )
}

const Works: React.FC<Work[]> = works => {
  const { scrollPx } = useScroll()
  const firstTileRef = useRef<HTMLDivElement>()
  const { offsetTop } = firstTileRef.current || { offsetTop: 1000 }

  const getTileVisibility = (index: number): boolean => {
    if (isBrowser()) {
      const top = scrollPx - offsetTop

      const isVisible =
        Math.floor(
          (top + window.innerHeight * 0.4) / (window.innerHeight * 0.9)
        ) === index

      return isVisible
    } else return false
  }

  return (
    <div id="Works">
      {Object.values(works).map((work, i) => {
        const ref = i === 0 ? firstTileRef : null
        const scrollTop =
          !isBrowser() || scrollPx < offsetTop - window.innerHeight
            ? 0
            : scrollPx - offsetTop - i * (window.innerHeight * 0.9)

        return (
          <WorkTile
            firstRef={ref as MutableRefObject<HTMLDivElement>}
            key={work.uid}
            visible={getTileVisibility(i)}
            work={work}
            scrollTop={scrollTop}
          />
        )
      })}
    </div>
  )
}

export default Works
