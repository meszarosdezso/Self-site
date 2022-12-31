import { SanityAssetDocument } from '@sanity/client'

export type Experiment = {
  title: string
  date: string
  description: string
  file: SanityAssetDocument
}
