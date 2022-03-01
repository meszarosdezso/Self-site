import styles from './VizualizationsPage.module.scss'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import Vizualization from '../../models/viz'
import { fetchVizualizations } from '../../utils/api'
import Nav from '../../components/Nav/Nav'

const meta = {
  title: 'Vizualizations',
  description: 'Generative vizualizations based on public data.',
}

interface Props {
  vizualizations: Vizualization[]
}

export default function VizualizationsPage({ vizualizations }: Props) {
  return (
    <Layout {...meta}>
      <div id={styles.VizualizationsPage}>
        <Nav hideMenu />
        <header>
          <h1>{meta.title}</h1>
          <p className={`sans ${styles.description}`}>{meta.description}</p>
        </header>

        <section className={styles['vizualization-cards']}>
          {vizualizations.map(viz => (
            <div key={viz.slug} className={styles.VizualizationCard}>
              <div className={styles.preview}>
                <img src={viz.preview} alt={viz.title} />
              </div>
              <div className={styles.details}>
                <h3>{viz.title}</h3>
              </div>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const vizualizations = await fetchVizualizations()

  return {
    props: {
      vizualizations,
    },
  }
}
