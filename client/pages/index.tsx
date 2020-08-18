import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout/Layout'
import { fetchInstagram, fetchWorks } from '../utils/api'
import { InstagramPost } from '../models/instagram'
import LandingPage from '../components/LandingPage/LandingPage'
import Canvas from '../components/Canvas/Canvas'
import Instagram from '../components/Instagram/Instagram'
import { Work } from '../models/work'
import Works from '../components/Works/Works'

type Props = {
  posts: InstagramPost[]
  works: Work[]
}

const IndexPage: React.FC<Props> = ({ posts, works }) => {
  return (
    <Layout title="Home" description={''}>
      {process.env.NODE_ENV === 'production' && (
        <div className="canvas-wrapper">
          <Canvas />
        </div>
      )}
      <LandingPage />

      <Works {...works} />
      <Instagram posts={posts} />
    </Layout>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async (_) => {
  const posts = await fetchInstagram()
  const works = await fetchWorks()

  return {
    props: {
      posts,
      works,
    },
  }
}
