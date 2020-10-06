import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { useState } from 'react'
import { ChevronDown } from 'react-feather'
import ReactMarkdown from 'react-markdown'
import Footer from '../../components/Footer/Footer'
import Social from '../../components/Social/Social'
import { fetchBioPage } from '../../utils/api'
import { rangeMap } from '../../utils/math'
import './Bio.scss'

type BioProps = {
  rawBio: string
}

const BioPage: React.FC<BioProps> = ({ rawBio }) => {
  const [headerOpacity, setHeaderOpacity] = useState(1)

  useScrollPosition(
    ({ currPos: { y } }) => {
      if (-y <= window.innerHeight / 2)
        setHeaderOpacity(1 - -y / (window.innerHeight / 2))
    },
    [headerOpacity]
  )

  return (
    <div className="page">
      <Head>
        <title>Biography | Dezso Meszaros - Front-end developer 👨🏽‍💻</title>
        <meta
          name="description"
          content="I am a Budapest based Hungarian developer, creating web and cross platform mobile apps, user interfaces and experiences."
        />
        <meta name="og:title" content="Dezso Meszaros" />
        <meta
          name="og:description"
          content="I am a Budapest based Hungarian developer, creating web and cross platform mobile apps, user interfaces and experiences."
        />
        <meta name="og:url" content={'https://meszarosdezso.com/'} />
        <meta
          name="og:image"
          content={'https://meszarosdezso.com/littler_me.jpg'}
        />
        <link rel="icon" type="image/png" href="/logo120.png" />
      </Head>

      <div id="BioPage">
        <div
          style={{
            opacity: rangeMap(headerOpacity, 1, 0, 0.4, 0.2),
          }}
          className="background"
        >
          <img src="me.jpg" alt="Me" />
        </div>

        <Link href="/">
          <img src="logo240.png" alt="Logo" id="logo" />
        </Link>

        <div className="content">
          <header
            style={{
              position: 'fixed',
              opacity: headerOpacity,
              transform: `scale(${rangeMap(headerOpacity, 1, 0, 1, 0.8)})`,
            }}
          >
            <h1>Biography</h1>

            <h2>A little bit about me</h2>

            <ChevronDown id="scrollIcon" color={'white'} />
          </header>
          <div
            style={{ opacity: rangeMap(headerOpacity, 1, 0, 0, 1) }}
            className="text"
          >
            <ReactMarkdown linkTarget="_blank">{rawBio}</ReactMarkdown>
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
  const { content: rawBio } = await fetchBioPage()

  return {
    props: {
      rawBio,
    },
  }
}
