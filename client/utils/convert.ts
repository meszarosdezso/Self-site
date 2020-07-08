import { Work } from "../models/work"

export const workFromApi = ({
  title,
  date,
  description,
  images,
  cover,
  categories,
  uid,
}: any): Work => ({
  title,
  cover: cover.url,
  year: date.split("-")[0],
  description,
  images: images.map((img: any) =>
    img.mime !== "video/mp4" ? img.url : img.url
  ),
  categories: categories.split(";").filter((a: string) => a),
  uid,
})

export const sizedImage = (url: string, width: number) =>
  url.replace("upload", "upload/w_" + width)
