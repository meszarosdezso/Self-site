import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { ArrowLeft } from 'react-feather'
import ReactMarkdown from 'react-markdown'
import Footer from '../../components/Footer/Footer'
import Social from '../../components/Social/Social'
import { fetchBioPage } from '../../utils/api'
import './Bio.scss'

type BioProps = {
  rawBio: string
}

const BioPage: React.FC<BioProps> = ({ rawBio }) => {
  return (
    <div id="BioPage">
      <Link href="/">
        <a>
          <ArrowLeft />
        </a>
      </Link>
      <h1 id="bio-title">For now, this is just my CV</h1>
      <h4 className="sans">I swear, I will update it later.</h4>

      <ReactMarkdown className="content">{rawBio}</ReactMarkdown>

      <Social showLabels={false} />
      <Footer centered />
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
