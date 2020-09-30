import axios from 'axios'
import { workFromApi } from './convert'
import { GithubProfile, OFFLINE_GITHUB_PROFILE } from '../models/profile'
import { Work } from '../models/work'
import { InstagramPost, InstagramResponse } from '../models/instagram'
import { readFileSync, existsSync, writeFileSync } from 'fs'

export const fetchBioPage = async () => {
  const { data } = await axios.get(`${process.env.API_URL}/bio-page`)
  console.log(data)
  return data
}

export const fetchWorks = async (): Promise<Work[]> => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/works`)

    return data.map(workFromApi)
  } catch (e) {
    console.error(e.message)
    return []
  }
}

export const fetchWork = async (id: string): Promise<Work> => {
  const { data } = await axios.get(`${process.env.API_URL}/works/${id}`)

  return workFromApi(data)
}

export const fetchProfile = async (): Promise<GithubProfile> => {
  if (process.env.NODE_ENV === 'development') return OFFLINE_GITHUB_PROFILE

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
  const hasCached = existsSync('data/post_cache.json')

  if (hasCached) {
    return JSON.parse(readFileSync('data/post_cache.json').toString())
  }

  const postIds = await axios
    .get<InstagramResponse>(
      `https://graph.instagram.com/me/media?fields=id&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=6`
    )
    .then(data => data.data)
    .catch(console.log)

  if (!postIds) return []

  const posts = await Promise.all(
    postIds.data.map(
      async ({ id }) =>
        (
          await axios.get<InstagramPost>(
            `https://graph.instagram.com/${id}?fields=id,media_url,media_type,username,timestamp,thumbnail_url,permalink,caption&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}`
          )
        ).data
    )
  )

  writeFileSync('data/post_cache.json', JSON.stringify(posts, null, 2), 'utf8')

  return posts
}
