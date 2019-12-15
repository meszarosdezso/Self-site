import React, { createContext, useContext } from "react"
import useFetch from "../Hooks/useFetch"
import Loading from "../Pages/Loading/Loading"
import ProfileImage from "../Assets/profile.jpg"

interface ProfileProps {
  imageUrl: string
  name: string
}

const ProfileContext = createContext<ProfileProps>({} as ProfileProps)

const ProfileProvider: React.FC = ({ children }) => {
  const { data, loading } = useFetch(
    "https://api.github.com/users/meszarosdezso"
  )

  return loading ? (
    <Loading />
  ) : (
    <ProfileContext.Provider
      value={{
        imageUrl: data!["avatar_url"] || ProfileImage,
        name: data!["name"] || "Dezso Meszaros"
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider
