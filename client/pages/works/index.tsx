import Layout from "../../components/Layout/Layout"
import "./works.scss"
import { useState, useMemo, useEffect } from "react"
import { GetStaticProps } from "next"
import { Work } from "../../models/work"
import { fetchWorks, fetchProfile } from "../../utils/api"
import WorkCard from "../../components/WorkCard/WorkCard"
import MovingHeader from "../../components/MovingHeader/MovingHeader"
import { GithubProfile } from "../../models/profile"
import MyName from "../../components/MyName/MyName"
import ProfileProvider from "../../providers/profile.provider"
import { useRouter } from "next/router"
import FieldSelector from "../../components/FieldSelector/FieldSelector"
import { useScroll } from "../../providers/scroll.provider"
import { isBrowser } from "../../utils/window"

type Props = {
  works: Work[]
  profile: GithubProfile
}

const WorksPage: React.FC<Props> = ({ works, profile }) => {
  const fields = useMemo(() => {
    return [...new Set(works.map((w) => w.categories).flat())]
  }, [])

  const [activeFields, setActiveFields] = useState<string[]>(fields)

  const router = useRouter()

  useEffect(() => {
    const selectedFields = (router?.query?.fields as string)
      ?.split(",")
      .map((f) => f.replace(/-/g, " "))
    setActiveFields(selectedFields || fields)
  }, [router.query])

  const { scrollPx } = useScroll()

  const scrollIndex = isBrowser()
    ? (scrollPx - window.innerHeight + (window.innerHeight - 360)) / 410
    : -1

  return (
    <ProfileProvider {...profile}>
      <Layout
        title={"#IMadeThis"}
        description={"My latest selected works."}
        bodyClass={"WorksPage"}
      >
        <div className="WorksPage">
          <MovingHeader title={"#IMADETHIS"} image={"paris.jpg"}>
            <MyName
              style={{ top: "30%", left: "10%", position: "absolute" }}
              name={profile.name}
            />
          </MovingHeader>

          <FieldSelector
            fields={fields}
            activeFields={activeFields}
            onChange={setActiveFields}
          />

          <div className="works">
            {works
              .filter((work) =>
                work.categories.some((c) => activeFields.includes(c))
              )
              .map((work, i) => (
                <WorkCard
                  key={work.uid}
                  work={work}
                  index={i}
                  scrollIndex={scrollIndex}
                />
              ))}
          </div>

          <h4 className="comment">More works are coming!</h4>
        </div>
      </Layout>
    </ProfileProvider>
  )
}

export default WorksPage

export const getStaticProps: GetStaticProps = async () => {
  const profile = await fetchProfile()
  try {
    const works = await fetchWorks()

    return {
      props: {
        works,
        profile,
      },
    }
  } catch (e) {
    return {
      props: {
        works: [],
        profile,
      },
    }
  }
}
