import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import ReactMarkdown from 'react-markdown'
import Footer from '../../components/Footer/Footer'
import LightSwitch from '../../components/LightSwitch/LightSwitch'
import Social from '../../components/Social/Social'
import { fetchBioPage } from '../../utils/api'
import './Bio.scss'

type BioProps = {
  rawBio: string
}

const BioPage: React.FC<BioProps> = ({ rawBio }) => {
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
        <LightSwitch />
        <Link href="/">
          <a>
            <ArrowLeft />
          </a>
        </Link>
        <div className="images">
          <img src="littler_me.jpg" alt="Little me" id="little-me" />
          <img src="me.jpg" alt="Me" id="big-me" />
        </div>

        <h1 id="bio-title">For now, this is just my CV</h1>
        <h4 className="sans">I swear, I will update it later.</h4>

        <ReactMarkdown className="content">{rawBio}</ReactMarkdown>

        <Social showLabels={false} />
        <Footer centered />
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
