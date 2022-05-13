export type Work = {
  slug: string
  title: string
  date: string
  tags: string[]
  short_description: string
  description: string
  cover: string
  images: { url: string }[]
  url: string | null
  stack: string[]
}
