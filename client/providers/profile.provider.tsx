import React, { createContext, useContext } from "react"
import { GithubProfile } from "../models/profile"

const ProfileContext = createContext<GithubProfile>({} as GithubProfile)

const ProfileProvider: React.FC<GithubProfile> = ({ children, ...profile }) => {
  return (
    <ProfileContext.Provider value={{ ...profile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)

export default ProfileProvider
