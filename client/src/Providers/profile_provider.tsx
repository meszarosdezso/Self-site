import React, { createContext, useContext } from "react"
import useFetch from "../Hooks/useFetch"
import Loading from "../Pages/Loading/Loading"
import ProfileImage from "../Assets/profile.jpg"
import { BASE_URL } from ".."

interface ProfileProps {
  imageUrl: string
  name: string
  repos: any[]
}

const ProfileContext = createContext<ProfileProps>({} as ProfileProps)

const ProfileProvider: React.FC = ({ children }) => {
  const [profile, profileLoading] = useFetch(
    `${BASE_URL}/api`
    // "https://jsonplaceholder.typicode.com/users/1"
  )

  const [repos, reposLoading] = useFetch<[]>(
    `${BASE_URL}/api/repos`
    // "https://jsonplaceholder.typicode.com/posts?_limit=5"
  )

  return profileLoading || reposLoading ? (
    <Loading />
  ) : (
    <ProfileContext.Provider
      value={{
        imageUrl: profile!["avatar_url"] || ProfileImage,
        name: profile!["name"] || "Dezso Meszaros",
        repos: repos.map(repo => ({
          name: repo["name"],
          id: repo["id"],
          url: repo["html_url"]
        }))
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider
