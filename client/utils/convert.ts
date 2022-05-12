import { Work } from '../models/work'

export const workFromApi = ({
  title,
  date,
  short_description,
  long_description,
  images,
  cover,
  categories,
  uid,
  link,
}: any): Work => ({
  title,
  cover: cover.url,
  year: date.split('-')[0],
  short_description,
  long_description,
  images: images.map((img: any) =>
    img.mime !== 'video/mp4' ? img.url : img.url
  ),
  categories: categories.split(';').filter((a: string) => a),
  uid,
  link: link || '',
})

export const sizedImage = (url: string, width: number) =>
  url.replace('upload', 'upload/w_' + width)
