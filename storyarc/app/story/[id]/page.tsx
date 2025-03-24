"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Volume2, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react"
import { generateStory } from "@/lib/story-generator"
import type { StoryData } from "@/lib/types"

export default function StoryPage() {
  const { id } = useParams()
  const [story, setStory] = useState<StoryData | null>(null)
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Generate a story based on the ID
    const generatedStory = generateStory(id as string)
    setStory(generatedStory)
  }, [id])

  useEffect(() => {
    // Reset audio state when changing episodes
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [currentEpisode])

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const nextEpisode = () => {
    if (story && currentEpisode < story.episodes.length - 1) {
      setCurrentEpisode(currentEpisode + 1)
    }
  }

  const prevEpisode = () => {
    if (currentEpisode > 0) {
      setCurrentEpisode(currentEpisode - 1)
    }
  }

  if (!story) {
    return (
      <div className="container flex items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading story...</h2>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  const episode = story.episodes[currentEpisode]

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{story.title}</h1>
            <p className="text-muted-foreground">
              {story.genre} • {story.episodes.length} Episodes
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-0 overflow-hidden">
                <img
                  src={episode.thumbnails[selectedThumbnail] || "/placeholder.svg"}
                  alt={`Episode ${currentEpisode + 1} thumbnail`}
                  className="w-full aspect-video object-cover"
                />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2">
              {episode.thumbnails.map((thumbnail, index) => (
                <button
                  key={index}
                  className={`w-16 h-16 rounded overflow-hidden border-2 ${
                    selectedThumbnail === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedThumbnail(index)}
                >
                  <img
                    src={thumbnail || "/placeholder.svg"}
                    alt={`Thumbnail option ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">
                  Episode {currentEpisode + 1}: {episode.title}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={prevEpisode} disabled={currentEpisode === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextEpisode}
                    disabled={currentEpisode === story.episodes.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="outline" size="icon" onClick={handlePlayPause}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1 flex items-center gap-2">
                    <span className="text-xs">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1"
                    />
                    <span className="text-xs">{formatTime(duration)}</span>
                  </div>
                  <Volume2 className="h-4 w-4" />
                </div>
                <audio
                  ref={audioRef}
                  src={episode.audioUrl}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                  className="hidden"
                />
              </div>
            </div>

            <Tabs defaultValue="transcript">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>
              <TabsContent value="transcript" className="mt-4">
                <div className="prose max-w-none dark:prose-invert">
                  {episode.content.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="summary" className="mt-4">
                <div className="prose max-w-none dark:prose-invert">
                  <p>{episode.summary}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Story Overview</h3>
                <p className="text-muted-foreground mb-4">{story.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Genre:</span>
                    <span className="font-medium">{story.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Episodes:</span>
                    <span className="font-medium">{story.episodes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Created:</span>
                    <span className="font-medium">{story.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Episodes</h3>
                <div className="space-y-2">
                  {story.episodes.map((ep, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-3 rounded-lg ${
                        currentEpisode === index ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => setCurrentEpisode(index)}
                    >
                      <div className="font-medium">
                        Episode {index + 1}: {ep.title}
                      </div>
                      <div
                        className={`text-sm ${
                          currentEpisode === index ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {ep.duration}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

