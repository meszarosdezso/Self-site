import React from "react"
import ProfileProvider from "../providers/profile.provider"
import { GetStaticProps } from "next"
import { GithubProfile } from "../models/profile"
import Layout from "../components/Layout/Layout"
import { fetchProfile, fetchInstagram } from "../utils/api"
import { InstagramPost } from "../models/instagram"
import LandingPage from "../components/LandingPage/LandingPage"

const IndexPage: React.FC<{
  profile: GithubProfile
  posts: InstagramPost[]
}> = ({ profile }) => {
  return (
    <ProfileProvider {...profile}>
      <Layout title="Home" description={profile.bio}>
        <LandingPage />
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
