import React from 'react'
import { GetStaticProps } from 'next'
import Layout from '../components/Layout/Layout'
import { fetchExperiments, fetchInstagram, fetchWorks } from '../utils/api'
import { InstagramPost } from '../models/instagram'
import LandingPage from '../components/LandingPage/LandingPage'
import Canvas from '../components/Canvas/Canvas'
import Instagram from '../components/Instagram/Instagram'
import { Work } from '../models/work'
import Works from '../components/Works/Works'
import Contact from '../components/Contact/Contact'
import { Experiment } from '../models/experiment'
import { Experiments } from '../components/Experiments/Experiments'

type Props = {
  works: Work[]
  posts: InstagramPost[]
  experiments: Experiment[]
}

const IndexPage: React.FC<Props> = ({ works, posts, experiments }) => {
  return (
    <Layout title="Home">
      {process.env.NODE_ENV === 'production' && (
        <div className="canvas-wrapper">
          <Canvas />
        </div>
      )}
      <LandingPage />

      <Works works={works} />
      <Experiments experiments={experiments} />
      <Instagram posts={posts} />
      <Contact />
    </Layout>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps<Props> = async _ => {
  const works = await fetchWorks()
  const experiments = await fetchExperiments()
  const posts = await fetchInstagram()

  return {
    props: { works, posts, experiments },
  }
}
