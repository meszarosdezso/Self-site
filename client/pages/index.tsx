import React from "react"
import LandingPage from "../components/LandingPage/LandingPage"
import ProfileProvider from "../providers/profile.provider"
import { GetStaticProps } from "next"
import { GithubProfile } from "../models/profile"
import Canvas from "../components/Canvas/Canvas"
import AboutMe from "../components/About/About"
import ImDoing from "../components/ImDoing/ImDoing"
import ContactMe from "../components/ContactMe/ContactMe"
import Instagram from "../components/Instagram/Instagram"
import { InstagramPost } from "../models/instagram"
import Layout from "../components/Layout/Layout"
import { fetchProfile, fetchInstagram } from "../utils/api"

const IndexPage: React.FC<{
  profile: GithubProfile
  posts: InstagramPost[]
}> = ({ profile, posts }) => {
  return (
    <ProfileProvider {...profile}>
      <Layout title="Home" description={profile.bio}>
        <div className="IndexPage">
          <div className="canvas-wrapper">
            {process.env.NODE_ENV === "production" && <Canvas />}
          </div>

          <div className="page-content" style={{ zIndex: 10 }}>
            <LandingPage />
            <AboutMe />
            <ImDoing />
            <ContactMe />
            {posts.length ? <Instagram posts={posts} /> : null}
          </div>
        </div>
      </Layout>
    </ProfileProvider>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async (_) => {
  const profile = await fetchProfile()
  const posts = await fetchInstagram()

  return {
    props: {
      profile,
      posts,
    },
  }
}
