import React, { createContext, useContext, useEffect } from "react"
import Loading from "../Pages/Loading/Loading"
import { BASE_URL } from "../index"
import useFetch from "../Hooks/useFetch"

interface ProfileProps {
  imageUrl: string
  name: string
  bio: string
  blogLink: string
}

const ProfileContext = createContext<ProfileProps>({} as ProfileProps)

const ProfileProvider: React.FC = ({ children }) => {
  const [profile, loading] = useFetch<any>(`${BASE_URL}/api/me`)

  useEffect(() => {
    if (!loading) {
      document.title = profile ? profile["name"] : "API Error"
      document.body.style.overflow = profile ? "inherit" : "hidden"
    }
  }, [profile, loading])

  return loading ? (
    <Loading />
  ) : (
    <ProfileContext.Provider
      value={{
        imageUrl: profile ? profile!["avatar_url"] : "",
        name: profile ? profile["name"] : "API Error):",
        bio: profile
          ? profile!["bio"]
          : `If you see this, there was an issue with the server.
          I'm probably already working on it, so play with the background while it's being fixed!(;
          `,
        blogLink: profile ? profile["blog"] : ""
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider
