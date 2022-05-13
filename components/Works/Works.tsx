import styles from './Works.module.scss'
import { Work } from '../../models/work'
import { MutableRefObject, useRef, useState } from 'react'
import { isBrowser } from '../../utils/window'
import Link from 'next/link'
import { sizedImage } from '../../utils/convert'
import { useScrollPosition } from '@n8tb1t/use-scroll-position'

const WorkTile: React.FC<{
  work: Work
  firstRef?: MutableRefObject<HTMLDivElement> | null
  visible: boolean
  scrollTop: number
}> = ({ work, firstRef, visible, scrollTop }) => {
  return (
    <div
      ref={firstRef}
      className={`${
        visible ? `${styles.WorkTile} ${styles.visible}` : styles.WorkTile
      }`}
    >
      <div className={styles.image}>
        <img
          style={{
            transform: `translateY(${scrollTop / 3}px) scale(1.2)`,
          }}
          src={sizedImage(work.cover, 1080)}
          alt={work.title}
        />
      </div>
      <div
        className={styles.details}
        style={{ top: `${40 + scrollTop * 0.8}px` }}
      >
        <span className={styles.tag}>
          {work.year} <div className={styles.line} /> {work.categories[0]}
        </span>
        <Link href={work.uid === 'self-site' ? '/' : `/works/${work.uid}`}>
          <a>
            <h1 className={styles.title}>{work.title}</h1>
          </a>
        </Link>
        <p className={`sans ${styles.description}`}>{work.short_description}</p>
      </div>
    </div>
  )
}

const Works: React.FC<{ works: Work[] }> = ({ works }) => {
  const [scrollPx, setScrollPx] = useState(0)

  useScrollPosition(({ currPos: { y } }) => setScrollPx(-y), [scrollPx])

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
    <div id={styles.Works}>
      {works.map((work, i) => {
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
