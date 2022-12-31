import { Experiment } from '../../models/experiment'
import styles from './Experiments.module.scss'
import { DateTime } from 'luxon'

type Props = {
  experiments: Experiment[]
}

export function Experiments({ experiments }: Props) {
  return (
    <div className={styles.ExperimentsSection} id="Experiments">
      <div className={styles.title}>
        <h1>Experiments</h1>

        <p className="sans">
          Some generative art using{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://nannou.cc">
            Nannou
          </a>{' '}
          &amp;{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://processing.org"
          >
            Processing
          </a>
          , heavily inspired by the awesome artworks of{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://rauno.me">
            Rauno Freiberg
          </a>
          .
        </p>
      </div>

      <div className={styles.experiments}>
        {experiments.map((exp, i) => (
          <div className={styles.experiment} key={exp.title + i}>
            <div className={styles.media}>
              {exp.file.mimeType.includes('image') ? (
                <img src={exp.file.url} alt={exp.title} />
              ) : (
                <video loop playsInline muted autoPlay src={exp.file.url} />
              )}
            </div>
            <code className={`${styles.meta} sans`}>
              <h3>{exp.title}</h3>
              <p>
                {exp.description},
                {DateTime.fromFormat(exp.date, 'yyyy-MM-dd').toFormat(
                  ' MMMM yyyy'
                )}
              </p>
            </code>
          </div>
        ))}
      </div>
    </div>
  )
}
