import Link from 'next/link'
import styles from './Works.module.scss'
import { Work } from '../../models/work'
import { MutableRefObject, useRef, useState } from 'react'
import { isBrowser, useWindowSize } from '../../utils/window'
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
          src={work.cover}
          alt={work.title}
        />
      </div>
      {visible && (
        <div
          className={styles.details}
          style={{
            transform: `translate(-50%, ${50 + scrollTop * 0.8}px)`,
          }}
        >
          <span className={`${styles.tag} sans`}>
            {work.date.substring(0, 4)} <div className={styles.line} />{' '}
            {work.tags[0]}
          </span>
          <Link href={work.url ? work.url : `/works/${work.slug}`}>
            <h1 className={styles.title}>{work.title}</h1>
          </Link>
          <p className={`sans ${styles.description}`}>
            {work.short_description}
          </p>
        </div>
      )}
    </div>
  )
}

function getTileVisibility(
  index: number,
  scrollPx: number,
  offsetTop: number
): boolean {
  if (!isBrowser()) return false

  const top = scrollPx - offsetTop

  return (
    Math.floor(
      (top + window.innerHeight * 0.45) / (window.innerHeight * 0.9)
    ) === index
  )
}

const Works: React.FC<{ works: Work[] }> = ({ works }) => {
  const [scrollPx, setScrollPx] = useState(0)
  const { height } = useWindowSize()

  useScrollPosition(({ currPos: { y } }) => {
    setScrollPx(-y)
  }, [])

  const firstTileRef = useRef<HTMLDivElement>()
  const offsetTop = firstTileRef.current?.offsetTop || 1000

  return (
    <div id={styles.Works}>
      {works.map((work, i) => {
        const ref = i === 0 ? firstTileRef : null
        const scrollTop =
          !isBrowser() || scrollPx < offsetTop - height
            ? 0
            : scrollPx - offsetTop - i * (height * 0.9)

        return (
          <WorkTile
            firstRef={ref as MutableRefObject<HTMLDivElement>}
            key={work.slug}
            visible={getTileVisibility(i, scrollPx, offsetTop)}
            work={work}
            scrollTop={scrollTop}
          />
        )
      })}
    </div>
  )
}

export default Works
