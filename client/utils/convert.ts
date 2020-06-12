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
  cover: cover.formats.medium.url,
  year: date.split("-")[0],
  description,
  images: images.map((img: any) =>
    img.mime !== "video/mp4" ? img.formats.large.url : img.url
  ),
  categories: categories.split(";").filter((a: string) => a),
  uid,
})
