import { Experiment } from '../../models/experiment'
import styles from './Experiments.module.scss'

type Props = {
  experiments: Experiment[]
}

export function Experiments({ experiments }: Props) {
  return (
    <div id={styles.Experiments}>
      <div className={styles.title}>
        <h1>Experiments</h1>

        <p className="sans">
          Some generative art I've been experimenting with in the last months.
          All created with{' '}
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://processing.org"
          >
            Processing
          </a>{' '}
          and was heavily inspired by the awesome works of{' '}
          <a rel="noopener noreferrer" target="_blank" href="https://rauno.me">
            Rauno Freiberg
          </a>
          .
        </p>
      </div>

      <div className={styles.experiments}>
        {experiments.map((exp, i) => (
          <div className={styles.experiment} key={exp.title + i}>
            {exp.file.mimeType.includes('image') ? (
              <img src={exp.file.url} alt={exp.title} />
            ) : (
              <video loop autoPlay muted src={exp.file.url} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
