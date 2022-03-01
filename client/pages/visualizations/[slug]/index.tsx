import styles from './Visualization.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import LightSwitch from '../../../components/LightSwitch/LightSwitch'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import Visualization from '../../../models/viz'
import { fetchViz, fetchVisualizations } from '../../../utils/api'

type Props = {
  viz: Visualization
}

const WorkPage: React.FC<Props> = ({ viz }) => {
  return (
    <div className="page">
      <Head>
        <title>
          {viz.title} | Visualizations | Dezso Meszaros - Front-end developer 👨🏽‍💻
        </title>
        <meta name="description" content={viz.description} />
        <meta name="og:title" content={viz.title} />
        <meta name="og:description" content={viz.description} />
        <meta
          name="og:url"
          content={`https://meszarosdezso.com/visualizations/${viz.slug}`}
        />
        <meta name="og:image" content={viz.preview} />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className={styles.VizPage}>
        <LightSwitch id={styles.LightSwitch} />

        <header>
          <h1 className={styles.title}>{viz.title}</h1>

          <ReactMarkdown
            linkTarget="_blank"
            className={`sans ${styles.description}`}
          >
            {viz.description}
          </ReactMarkdown>
        </header>

        <div className={styles.preview}>
          <img src={`/assets/visualizations/${viz.slug}.png`} alt={viz.title} />
        </div>

        <Link href="/visualizations">
          <a className={`sans ${styles['go-back']}`}>Go back</a>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async _ => {
  const works = await fetchVisualizations()

  const paths = works.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { slug } = params!

  const viz = (await fetchViz(slug as string)) as Visualization

  return {
    props: {
      viz,
    },
  }
}

export default WorkPage
