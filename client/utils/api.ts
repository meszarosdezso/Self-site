import axios from 'axios'
import { vizFromApi, workFromApi } from './convert'
import { Work } from '../models/work'
import { InstagramPost, InstagramResponse } from '../models/instagram'
import { readFileSync, existsSync, writeFileSync, createWriteStream } from 'fs'
import Visualization from '../models/viz'

export async function fetchVisualizations(): Promise<Visualization[]> {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/vizualizations`)
    return data.map(vizFromApi)
  } catch (e) {
    console.log(e)
    return []
  }
}

export const fetchBioPage = async () => {
  try {
    const { data } = await axios.get(`${process.env.API_URL}/bio-page`)
    return data
  } catch {
    return { content: 'Failed to load bio page' }
  }
}

export const fetchWorks = async (): Promise<Work[]> => {
  try {
    const { data } = await axios.get<any[]>(`${process.env.API_URL}/works`)

    return data.map(workFromApi).sort((a, b) => b.year.localeCompare(a.year))
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    return []
  }
}

export const fetchWork = async (id: string): Promise<Work> => {
  const { data } = await axios.get(`${process.env.API_URL}/works/${id}`)

  return workFromApi(data)
}

export const fetchInstagram = async (): Promise<InstagramPost[]> => {
  const hasCached = existsSync('data/post_cache.json')

  if (hasCached) {
    return JSON.parse(readFileSync('data/post_cache.json').toString())
  }

  const postIds = await axios
    .get<InstagramResponse>(
      `https://graph.instagram.com/me/media?fields=id&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=8`
    )
    .then(data => data.data)
    .catch(_ => console.log(`Did you forget to update your instagram token?`))

  if (!postIds) return []

  const fields = [
    'id',
    'media_url',
    'media_type',
    'username',
    'timestamp',
    'thumbnail_url',
    'permalink',
    'caption',
  ]

  const access_token = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!access_token) throw new Error('Missing Instagram token.')

  const params = new URLSearchParams({ fields: fields.join(','), access_token })

  const posts = await Promise.all(
    postIds.data.map(async ({ id }, i) => {
      const { data: post } = await axios.get<InstagramPost>(
        `https://graph.instagram.com/${id}?${params}`
      )

      const localUrl = `/assets/instagram_${i}.jpg`

      post.local_url = localUrl

      const stream = createWriteStream(`public/${localUrl}`)
      const { data } = await axios.get(post.media_url, {
        responseType: 'stream',
      })

      data.pipe(stream)

      return post
    })
  )

  writeFileSync('data/post_cache.json', JSON.stringify(posts, null, 2), 'utf8')

  return posts
}
