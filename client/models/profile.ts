export type GithubProfile = {
  name: string
  email: string
  blog: string
  avatar_url: string
  login: string
  bio: string
}

export const OFFLINE_GITHUB_PROFILE = {
  login: "meszarosdezso",
  avatar_url: "https://avatars2.githubusercontent.com/u/45368713?v=4",
  url: "https://api.github.com/users/meszarosdezso",
  name: "Dezső Mészáros",
  blog: "https://instagram.com/meszarosdezso",
  location: "Budapest, Hungary",
  email: "meszarosdezsodev@gmail.com",
  bio:
    "Hungarian full-stack web and flutter developer. Also doing photography and filmmaking.",
} as GithubProfile
