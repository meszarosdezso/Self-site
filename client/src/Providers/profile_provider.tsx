import React, { createContext, useContext, useState } from "react"
import useFetch from "../Hooks/useFetch"
import Loading from "../Pages/Loading/Loading"
import ProfileImage from "../Assets/profile.jpg"

interface ProfileProps {
  imageUrl: string
  name: string
  repos: any[]
}

const ProfileContext = createContext<ProfileProps>({} as ProfileProps)

const ProfileProvider: React.FC = ({ children }) => {
  const [profile, profileLoading] = useFetch(
    // "http://localhost:8080/api",
    // "http://localhost:8080/api/repos"
    "https://jsonplaceholder.typicode.com/users/1"
  )

  const [repos, reposLoading] = useFetch<[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
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
