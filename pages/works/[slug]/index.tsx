import styles from './Work.module.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchWorks, fetchWork } from '../../../utils/api'
import { Work } from '../../../models/work'
import LightSwitch from '../../../components/LightSwitch/LightSwitch'
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { PortableText } from '@portabletext/react'
import { TITLE_BASE } from '../../../constants/meta'

type Props = {
  work: Work
}

const WorkPage: React.FC<Props> = ({ work }) => {
  const title = `${work.title} | ${TITLE_BASE}`
  return (
    <div className="page">
      <Head>
        <title>{title}</title>
        <meta name="description" content={work.short_description} />
        <meta name="og:title" content={work.title} />
        <meta name="og:description" content={work.short_description} />
        <meta
          name="og:url"
          content={`https://meszarosdezso.com/works/${work.slug}`}
        />
        <meta name="og:image" content={work.cover} />
        <link rel="icon" type="image/png" href="/logo120.png" />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/jpp1qyx.css"
        ></link>
      </Head>
      <div className={styles.WorkPage}>
        <LightSwitch id={styles.LightSwitch} />

        <h1 className={styles.title}>{work.title}</h1>

        <h2 className={styles.date}>{work.date}</h2>

        <div className={`sans ${styles.description}`}>
          <PortableText value={work.description} />
        </div>

        <div className={styles.images}>
          {work.images?.map(({ url }) => (
            <div key={url} className={styles.image}>
              <img src={url} alt={work.title} />
            </div>
          ))}
        </div>

        <div className={styles.tags}>
          {work.tags.map(tag => (
            <span className="sans" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <Link href="/" className={styles['go-back']}>
          Go back
        </Link>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async _ => {
  const works = await fetchWorks()
  const paths = works.map(({ slug }) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!

  const work = await fetchWork(slug as string)

  return {
    props: {
      work,
    },
  }
}

export default WorkPage
