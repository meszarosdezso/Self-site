import styles from './Work.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchWorks, fetchWork } from '../../../utils/api'
import { Work } from '../../../models/work'
import LightSwitch from '../../../components/LightSwitch/LightSwitch'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'

type Props = {
  work: Work
}

const WorkPage: React.FC<Props> = ({ work }) => {
  return (
    <div className="page">
      <Head>
        <title>{work.title} | Dezso Meszaros - Front-end developer 👨🏽‍💻</title>
        <meta name="description" content={work.short_description} />
        <meta name="og:title" content={work.title} />
        <meta name="og:description" content={work.short_description} />
        <meta
          name="og:url"
          content={`https://meszarosdezso.com/works/${work.uid}`}
        />
        <meta name="og:image" content={work.cover} />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>
      <div className={styles.WorkPage}>
        <LightSwitch id={styles.LightSwitch} />

        <h1 className={styles.title}>{work.title}</h1>

        <h2 className={styles.date}>{work.year}</h2>

        <ReactMarkdown
          linkTarget="_blank"
          className={`sans ${styles.description}`}
        >
          {work.long_description}
        </ReactMarkdown>

        <div className={styles.images}>
          {work.images.map(url => (
            <div key={url} className={styles.image}>
              <img src={url} alt={work.title} />
            </div>
          ))}
        </div>

        <Link href="/">
          <a className={`sans ${styles['go-back']}`}>Go back</a>
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async _ => {
  const works = await fetchWorks()

  const paths = works.map(work => ({ params: { workId: work.uid } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { workId } = params!

  const work = await fetchWork(workId as string)

  return {
    props: {
      work,
    },
  }
}

export default WorkPage
