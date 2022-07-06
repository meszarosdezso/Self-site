import axios from 'axios'
import { Work } from '../models/work'
import { InstagramPost, InstagramResponse } from '../models/instagram'
import { readFileSync, existsSync, writeFileSync, createWriteStream } from 'fs'
import Visualization from '../models/viz'
import sanity from '../config/sanity'

export async function fetchVisualizations(): Promise<Visualization[]> {
  try {
    const data = await sanity.fetch<{ name: string; image_url: string }[]>(
      `*[ _type == "visualization" ]{ name, "image_url": image.asset->.url }`
    )
    return data
  } catch (e) {
    return []
  }
}

export const fetchBioPage = async () => {
  try {
    const { content: bio } = await sanity.fetch(
      `*[ _type == "bio" ][0]{ content }`
    )
    return bio
  } catch {
    return { content: 'Failed to load bio page' }
  }
}

export const fetchWorks = async (): Promise<Work[]> => {
  try {
    const works = await sanity.fetch<
      Work[]
    >(`*[ _type == "work" ] | order(order asc) {
        title,
            date,
            "slug": slug.current,
        short_description,
        url,
        "cover": images[0].asset->.url,
        tags
    }`)

    return works
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message)
    }
    return []
  }
}

export const fetchWork = async (slug: string): Promise<Work> => {
  const work =
    await sanity.fetch(`*[ _type == "work" && slug.current == '${slug}'][0]{
      title,
      description,
      "images": images[1...100].asset->{ url },
      date,
      stack,
      tags
    }`)

  return work
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

      stream.close()

      return post
    })
  )

  writeFileSync('data/post_cache.json', JSON.stringify(posts, null, 2), 'utf8')

  return posts
}
