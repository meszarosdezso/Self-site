import { SanityImageAssetDocument } from '@sanity/client'

export type Photo = {
  title: string
  url: string
  meta: Pick<
    SanityImageAssetDocument['metadata'],
    'blurHash' | 'exif' | 'dimensions' | 'lqip'
  >
}
