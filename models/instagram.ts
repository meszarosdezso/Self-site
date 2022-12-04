export type InstagramPost = {
  id: string
  local_url: string
  media_type?: string
  media_url: string
  username?: string
  timestamp: string
  caption: string
  permalink: string
  thumbnail_url?: string
}

export type InstagramResponse = {
  data: InstagramPost[]
  paging: {
    cursors: {
      before: string
      after: string
    }
    next: string
  }
}
