import React, { createContext, useContext, useEffect } from "react"
import Loading from "../Pages/Loading/Loading"
import { BASE_URL } from "../index"
import useFetch from "../Hooks/useFetch"

interface ProfileProps {
  imageUrl: string
  name: string
  bio: string
}

const ProfileContext = createContext<ProfileProps>({} as ProfileProps)

const ProfileProvider: React.FC = ({ children }) => {
  const [profile, loading] = useFetch<any>(`${BASE_URL}/api/me`)

  useEffect(() => {
    if (!loading) {
      document.title = profile["name"]
    }
  }, [profile, loading])

  return loading ? (
    <Loading />
  ) : (
    <ProfileContext.Provider
      value={{
        imageUrl: profile["avatar_url"],
        name: profile["name"],
        bio: profile["bio"]
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider
