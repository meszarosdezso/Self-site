import styles from './VizualizationsPage.module.scss'
import { GetStaticProps } from 'next'
import Layout from '../../components/Layout/Layout'
import Vizualization from '../../models/viz'
import { fetchVizualizations } from '../../utils/api'
import Nav from '../../components/Nav/Nav'
import Link from 'next/link'

const meta = {
  title: 'Vizualizations',
  description:
    "Generative vizualizations based on Budapest's public transport database.",
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
                <img
                  src={`/assets/vizualizations/${viz.slug}.png`}
                  alt={viz.title}
                />
              </div>
              <Link href={`/vizualizations/${viz.slug}`}>
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
  const vizualizations = await fetchVizualizations()

  return {
    props: {
      vizualizations,
    },
  }
}
