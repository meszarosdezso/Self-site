import "./me.scss"
import { GetStaticProps } from "next"
import { fetchBioPage, fetchProfile } from "../../utils/api"
import ReactMarkdown from "react-markdown"
import ThemeSwitcher from "../../components/ThemeSwitcher/ThemeSwitcher"
import Layout from "../../components/Layout/Layout"
import ProfileProvider from "../../providers/profile.provider"
import { GithubProfile } from "../../models/profile"
import { useTheme } from "../../providers/theme.provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"
import AC from "../../components/Ac/Ac"

const MePage: React.FC<{
  biography: string
  profile: GithubProfile
}> = ({ biography, profile }) => {
  const { isDark } = useTheme()

  return (
    <ProfileProvider {...profile}>
      <Layout title="This is me" description="My biography.">
        <div className="MePage">
          <AC>
            <FontAwesomeIcon size="sm" icon={faExclamationTriangle} />
          </AC>
          <span className="comment">
            &nbsp; This page is still under construction.
          </span>
          <br />
          <br />
          <br />
          <ThemeSwitcher
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "2rem",
            }}
          />
          <img id="bio-image" src={profile.avatar_url} alt="me" />
          <h1>About me</h1>
          <br />
          <ReactMarkdown
            className={isDark ? "dark" : "light"}
            source={biography
              .replace("&nbsp;", "\n<br/>\n")
              .replace("<ul>", '<ul className="list">')}
            escapeHtml={false}
          />
          <br />
        </div>
      </Layout>
    </ProfileProvider>
  )
}

export default MePage

export const getStaticProps: GetStaticProps = async () => {
  const { content: biography } = await fetchBioPage()
  const profile = await fetchProfile()

  return {
    props: {
      biography,
      profile,
    },
  }
}
