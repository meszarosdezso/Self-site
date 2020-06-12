import axios from "axios"
import { workFromApi } from "./convert"
import { GithubProfile, OFFLINE_GITHUB_PROFILE } from "../models/profile"
import { Work } from "../models/work"
import { InstagramPost, InstagramResponse } from "../models/instagram"

export const fetchBioPage = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/bio-page`)
  return data
}

export const fetchWorks = async (): Promise<Work[]> => {
  const { data } = await axios.get(`${process.env.API_URL}/works`)

  return data.map(workFromApi)
}

export const fetchWork = async (id: string): Promise<Work> => {
  const { data } = await axios.get(`${process.env.API_URL}/works/${id}`)

  return workFromApi(data)
}

export const fetchProfile = async (): Promise<GithubProfile> => {
  if (process.env.NODE_ENV === "development") return OFFLINE_GITHUB_PROFILE

  const { data } = await axios.get(
    `https://api.github.com/users/meszarosdezso`,
    {
      headers: {
        Authorization: process.env.GITHUB_ACCESS_TOKEN,
      },
    }
  )
  return data
}

export const fetchInstagram = async (): Promise<InstagramPost[]> => {
  const postIds =
    process.env.NODE_ENV === "production"
      ? await axios
          .get<InstagramResponse>(
            `https://graph.instagram.com/me/media?fields=id&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=6`
          )
          .then((data) => data.data)
          .catch(console.log)
      : ({ data: [] } as InstagramResponse)

  if (!postIds) return []

  const posts = await Promise.all(
    postIds.data.map(
      async ({ id }) =>
        (
          await axios.get<InstagramPost>(
            `https://graph.instagram.com/${id}?fields=id,media_url,media_type,username,timestamp,thumbnail_url,caption&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
          )
        ).data
    )
  )

  return posts
}
