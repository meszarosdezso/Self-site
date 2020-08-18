import './Works.scss'
import { Work } from '../../models/work'

const WorkTile: React.FC<Work> = (work) => {
  return (
    <div className="WorkTile">
      <div className="image">
        <img src={work.cover} alt={work.title} />
      </div>
      <div className="details">
        <h1>{work.title}</h1>
        <p className="sans description">{work.description}</p>

        <a>Read more</a>
      </div>
    </div>
  )
}

const Works: React.FC<Work[]> = (works) => {
  return (
    <div id="Works">
      {Object.values(works).map((work) => (
        <WorkTile key={work.uid} {...work} />
      ))}
    </div>
  )
}

export default Works
