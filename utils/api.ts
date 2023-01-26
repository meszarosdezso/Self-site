import axios from 'axios'
import { Work } from '../models/work'
import { InstagramResponse } from '../models/instagram'
import {
  readFileSync,
  existsSync,
  writeFileSync,
  createWriteStream,
  WriteStream,
} from 'fs'
import Visualization from '../models/viz'
import sanity from '../config/sanity'
import { Experiment } from '../models/experiment'
import { Photo } from '../models/photo'

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

export const fetchPhotos = async () => {
  try {
    const photos = await sanity.fetch<Photo[]>(`
      *[ _type == 'photo' ] | order(image.asset->.metadata.exif.DateTimeOriginal desc) {
        title,
        "url": image.asset->.url,
        "meta": image.asset->.metadata {
          blurHash,
          lqip,
          exif {
            "date": DateTimeOriginal,
            "f": FNumber,
            "lens": LensModel,
            "shutter": round(1 / ExposureTime),
            "focal": FocalLength,
          },
          dimensions
        }
      }
    `)

    return photos
  } catch {
    return []
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

export const fetchExperiments = async (): Promise<Experiment[]> => {
  try {
    const experiments = await sanity.fetch<
      Experiment[]
    >(`*[ _type == "experiment" ] | order(date desc) {
        title,
        date,
        "file": file.asset->,
        description
    }`)

    return experiments
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

export const fetchInstagram = async (): Promise<any> => {
  const hasCached = existsSync('data/post_cache.json')

  if (hasCached) {
    return JSON.parse(readFileSync('data/post_cache.json').toString())
  }

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

  const posts = await axios
    .get<InstagramResponse>(
      `https://graph.instagram.com/me/media?fields=${fields.join(
        ','
      )}&access_token=${access_token}&limit=8`
    )
    .then(data => data.data.data)
    .catch(_ => console.log(`Did you forget to update your instagram token?`))

  console.log({ posts })

  if (!posts) return []

  const localPosts = await Promise.all(
    posts.map(async (post, i) => {
      const localUrl = `/assets/instagram_${i}.jpg`

      const stream = createWriteStream(`public/${localUrl}`)
      const { data } = await axios.get<WriteStream>(post.media_url, {
        responseType: 'stream',
      })

      return new Promise(resolve => {
        const pipe = data.pipe(stream)
        pipe.addListener('finish', () => {
          resolve({ ...post, local_url: localUrl })
        })
      })
    })
  )

  writeFileSync(
    'data/post_cache.json',
    JSON.stringify(localPosts, null, 2),
    'utf8'
  )

  return localPosts
}
