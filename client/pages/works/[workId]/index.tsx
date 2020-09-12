import './Work.scss'
import { GetStaticPaths, GetStaticProps } from 'next'
import { fetchWorks, fetchWork } from '../../../utils/api'
import { Work } from '../../../models/work'
import LightSwitch from '../../../components/LightSwitch/LightSwitch'

type Props = {
  work: Work
}

const WorkPage: React.FC<Props> = ({ work }) => {
  return (
    <div className="WorkPage">
      <LightSwitch />

      <h1 className="title">{work.title}</h1>

      <h2 className="date">{work.year}</h2>

      <p className="sans">{work.description}</p>

      <div className="images">
        {work.images.map((url) => (
          <div key={url} className="image">
            <img src={url} alt={work.title} />
          </div>
        ))}
      </div>

      <button className="sans go-back">Go back</button>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const works = await fetchWorks()

  const paths = works.map((work) => ({ params: { workId: work.uid } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { workId } = params!

  const work = await fetchWork(workId as string)

  return {
    props: {
      work,
    },
  }
}

export default WorkPage
