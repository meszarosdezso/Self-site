import { Work } from "../../../models/work"
import { GetStaticProps, GetStaticPaths } from "next"
import { fetchWorks, fetchWork, fetchProfile } from "../../../utils/api"
import Layout from "../../../components/Layout/Layout"
import ProfileProvider from "../../../providers/profile.provider"
import { GithubProfile } from "../../../models/profile"
import "./work.scss"
import { useState, useMemo } from "react"
import { useTheme } from "../../../providers/theme.provider"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faCircle } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { LazyLoadImage as Image } from "react-lazy-load-image-component"
import { sizedImage } from "../../../utils/convert"

const WorkPage: React.FC<{ work: Work; profile: GithubProfile }> = ({
  work,
  profile,
}) => {
  const { isDark } = useTheme()
  const [mode, setMode] = useState<"LIGHT" | "DARK">(isDark ? "DARK" : "LIGHT")

  const texts = useMemo(() => work.description.split("\n"), [])

  return (
    <ProfileProvider {...profile}>
      <Layout
        title={`${work.title} - Works`}
        description={work.description}
        noFooter
      >
        <div
          style={{
            color: mode === "LIGHT" ? "black" : "white",
            background: mode === "LIGHT" ? "white" : "#111",
          }}
          className="WorkPage"
        >
          <header className="WorkPageHeader">
            <h1>{work.title}</h1>
            <h3 className="work-year mono">{work.year}</h3>
          </header>

          <div className="content">
            <div className="description">
              {texts.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="images">
              {work.images.map((img) =>
                img.includes(".mp4") ? (
                  <video
                    className="work-image"
                    autoPlay
                    muted
                    controls
                    src={img}
                  ></video>
                ) : (
                  <Image
                    key={img}
                    src={sizedImage(img, 1280)}
                    alt={work.title}
                    className="work-image"
                  />
                )
              )}

              <div className="comment">
                <Link href="/works">Go back</Link>
              </div>
            </div>
          </div>

          <FontAwesomeIcon
            className="work-page-toggle"
            onClick={(_) =>
              setMode((prev) => (prev === "LIGHT" ? "DARK" : "LIGHT"))
            }
            color={mode === "LIGHT" ? "black" : "#fff"}
            icon={mode === "LIGHT" ? faMoon : faCircle}
          />
        </div>
      </Layout>
    </ProfileProvider>
  )
}

export default WorkPage

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await fetchWorks()
  const paths = works.map((w) => ({ params: { id: w.uid } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const work = await fetchWork(params!.id as string)

  const profile = await fetchProfile()

  return {
    props: {
      work,
      profile,
    },
  }
}
