export interface Episode {
  title: string
  content: string
  summary: string
  audioUrl: string
  thumbnails: string[]
  duration: string
}

export interface StoryData {
  id: string
  title: string
  description: string
  genre: string
  createdAt: string
  episodes: Episode[]
}

