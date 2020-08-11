export type InstagramPost = {
  id: string
  media_type?: string
  media_url: string
  username?: string
  timestamp: string
  caption: string
  permalink: string
  thumbnail_url?: string
}

export type InstagramResponse = {
  data: []
  paging: {
    cursors: {
      before: string
      after: string
    }
    next: string
  }
}
