import { DateTime } from 'luxon'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Photo } from '../../models/photo'
import { isBrowser } from '../../utils/window'
import styles from './Gallery.module.scss'

export default function Gallery({ photos = [] }: { photos: Photo[] }) {
  const [cols, setCols] = useState(3)

  useEffect(() => {
    if (isBrowser()) {
      setCols(Math.floor(window.innerWidth / 360))
    }
  }, [typeof window === 'undefined'])

  const layout = useMemo(() => {
    return photos.reduce((layout, photo, i) => {
      const index = i % cols
      if (!layout[index]) layout[index] = []
      layout[index].push(photo)
      return layout
    }, [] as Photo[][])
  }, [cols])

  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
      }}
      className={styles.Gallery}
    >
      {layout.map((col, i) => (
        <ul key={`column-${i}`} className={styles.column}>
          {col.map(photo => (
            <div key={photo.url} className={styles.photo}>
              <Image
                style={{ width: '100%', height: '100%' }}
                src={photo.url}
                alt={photo.title}
                width={photo.meta.dimensions.width}
                height={photo.meta.dimensions.height}
                loading="lazy"
                placeholder="blur"
                blurDataURL={photo.meta.lqip}
              />

              <div className={styles.meta}>
                <ul className="sans">
                  <li>F{photo.meta.exif?.f}</li>
                  <li>1/{photo.meta.exif?.shutter}</li>
                  <li>{photo.meta.exif?.focal}mm</li>
                </ul>
                <p className="sans">
                  {photo.title},{' '}
                  {DateTime.fromISO(photo.meta.exif?.date).toFormat(
                    'MMMM yyyy'
                  )}
                </p>
              </div>
            </div>
          ))}
        </ul>
      ))}
    </div>
  )
}
