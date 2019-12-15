import React from "react"
import "./Repos.scss"
import { useProfile } from "../../Providers/profile_provider"

const Repos: React.FC = props => {
  const { repos } = useProfile()

  return (
    <div className='Repos'>
      <h1>Public repositories</h1>
      <ul className='repositories'>
        {repos.map(repo => (
          <li className='repo' key={repo.id}>
            <a href={repo.url} target='_blank' rel='noopener noreferrer'>
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Repos
