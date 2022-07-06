import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import Footer from '../../components/Footer/Footer'
import Social from '../../components/Social/Social'
import { fetchBioPage } from '../../utils/api'
import { rangeMap } from '../../utils/math'
import styles from './Bio.module.scss'
import { PortableText } from '@portabletext/react'
import {
  FAVICON_URL,
  META_DESCRIPTION,
  META_TITLE,
  OG_IMAGE,
  OG_URL,
  TITLE_BASE,
} from '../../constants/meta'

type BioProps = {
  bio: any[]
}

const BioPage: React.FC<BioProps> = ({ bio }) => {
  const [headerOpacity, setHeaderOpacity] = useState(1)

  useScrollPosition(
    ({ currPos: { y } }) => {
      if (-y <= window.innerHeight / 2)
        setHeaderOpacity(1 - -y / (window.innerHeight / 2))
    },
    [headerOpacity]
  )

  const title = `Biography | ${TITLE_BASE}`

  return (
    <div className="page">
      <Head>
        <title>{title}</title>
        <meta name="description" content={META_DESCRIPTION} />
        <meta name="og:title" content={META_TITLE} />
        <meta name="og:description" content={META_DESCRIPTION} />
        <meta name="og:url" content={OG_URL} />
        <meta name="og:image" content={OG_IMAGE} />
        <link rel="icon" type="image/png" href={FAVICON_URL} />
      </Head>

      <div id={styles.BioPage}>
        <div
          style={{
            opacity: rangeMap(headerOpacity, 1, 0, 0.4, 0.2),
          }}
          className={styles.background}
        >
          <img src="me.jpg" alt="Me" />
        </div>

        <Link href="/">
          <img src="logo240.png" alt="Logo" id={styles.logo} />
        </Link>

        <div className={styles.content}>
          <header
            style={{
              position: 'fixed',
              opacity: headerOpacity,
              transform: `scale(${rangeMap(headerOpacity, 1, 0, 1, 0.8)})`,
            }}
          >
            <h1>Biography</h1>

            <h2 className={styles.subtitle}>A little bit about me</h2>

            <ChevronDown id={styles.scrollIcon} color={'white'} />
          </header>
          <div
            style={{ opacity: rangeMap(headerOpacity, 1, 0, 0, 1) }}
            className={styles.text}
          >
            <PortableText value={bio} />
          </div>
          <Social showLabels={false} />
          <Footer centered />
        </div>
      </div>
    </div>
  )
}

export default BioPage

export const getStaticProps: GetStaticProps = async () => {
  const bio = await fetchBioPage()

  return {
    props: {
      bio,
    },
  }
}
