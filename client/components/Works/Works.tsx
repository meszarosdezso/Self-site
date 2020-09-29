import './Works.scss'
import { Work } from '../../models/work'
import { MutableRefObject, useMemo, useRef } from 'react'
import { useScroll } from '../../providers/scroll'
import { isBrowser } from '../../utils/window'
import { rangeMap } from '../../utils/math'
import Link from 'next/link'

const WorkTile: React.FC<{
  work: Work
}> = ({ work }) => {
  const tileRef = useRef<HTMLDivElement>()

  const tileHeight = useMemo(
    () => (isBrowser() ? window.innerHeight * 0.8 : 0),
    [typeof window]
  )

  const { scrollPx } = useScroll()

  const tileScrollPercent = tileRef.current
    ? rangeMap(scrollPx - tileRef.current.offsetTop, 0, tileHeight, 0, 100)
    : 0

  return (
    <div
      ref={tileRef as MutableRefObject<HTMLDivElement>}
      className={`${
        tileScrollPercent > -30 && tileScrollPercent < 50 ? 'visible ' : ''
      }WorkTile`}
    >
      <div className="image">
        <img
          style={{
            transform: `translateY(${tileScrollPercent}px) scale(1.2)`,
          }}
          src={work.cover}
          alt={work.title}
        />
      </div>
      <div
        style={{
          transform: `translateY(${tileScrollPercent * 1.5}px) `,
        }}
        className="details"
      >
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
  return (
    <div id="Works">
      {Object.values(works).map(work => (
        <WorkTile key={work.uid} work={work} />
      ))}
    </div>
  )
}

export default Works
