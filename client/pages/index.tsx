import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout/Layout"
import { fetchInstagram } from "../utils/api"
import { InstagramPost } from "../models/instagram"
import LandingPage from "../components/LandingPage/LandingPage"
import Canvas from "../components/Canvas/Canvas"
import Instagram from "../components/Instagram/Instagram"

const IndexPage: React.FC<{
  posts: InstagramPost[]
}> = ({ posts }) => {
  return (
    <Layout title="Home" description={""}>
      {process.env.NODE_ENV === "development" && (
        <div className="canvas-wrapper">
          <Canvas />
        </div>
      )}
      <LandingPage />
      <Instagram posts={posts} />
    </Layout>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async (_) => {
  const posts = await fetchInstagram()

  return {
    props: {
      posts,
    },
  }
}
