import styles from './VisualizationsPage.module.scss'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import Visualization from '../../models/viz'
import { fetchVisualizations } from '../../utils/api'
import Nav from '../../components/Nav/Nav'
import Link from 'next/link'

const meta = {
  title: 'Visualizations',
  description:
    "Generative illustrations based on Budapest's public transport database.",
}

interface Props {
  visualizations: Visualization[]
}

export default function VisualizationsPage({ visualizations }: Props) {
  return (
    <Layout {...meta}>
      <div id={styles.VisualizationsPage}>
        <Nav hideMenu />
        <header>
          <h1>{meta.title}</h1>
          <p className={`sans ${styles.description}`}>{meta.description}</p>
        </header>

        <section className={styles['visualization-cards']}>
          {visualizations.map(viz => (
            <div key={viz.slug} className={styles.VisualizationCard}>
              <div className={styles.preview}>
                <img
                  src={`/assets/visualizations/${viz.slug}.png`}
                  alt={viz.title}
                />
              </div>
              <Link href={`/visualizations/${viz.slug}`}>
                <div className={styles.details}>
                  <h3>{viz.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const visualizations = await fetchVisualizations()

  return {
    props: {
      visualizations,
    },
  }
}
