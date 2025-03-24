"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Search } from "lucide-react"
import { generateLibrary } from "@/lib/story-generator"
import type { StoryData } from "@/lib/types"

export default function LibraryPage() {
  const [stories, setStories] = useState<StoryData[]>([])
  const [filteredStories, setFilteredStories] = useState<StoryData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [genreFilter, setGenreFilter] = useState("all")

  useEffect(() => {
    // Generate sample library data
    const libraryData = generateLibrary()
    setStories(libraryData)
    setFilteredStories(libraryData)
  }, [])

  useEffect(() => {
    // Filter stories based on search term and genre
    let filtered = stories

    if (searchTerm) {
      filtered = filtered.filter(
        (story) =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (genreFilter !== "all") {
      filtered = filtered.filter((story) => story.genre.toLowerCase() === genreFilter.toLowerCase())
    }

    setFilteredStories(filtered)
  }, [searchTerm, genreFilter, stories])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleGenreFilter = (value: string) => {
    setGenreFilter(value)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Story Library</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search stories..." value={searchTerm} onChange={handleSearch} className="pl-10" />
        </div>
        <Select value={genreFilter} onValueChange={handleGenreFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="sci-fi">Science Fiction</SelectItem>
            <SelectItem value="mystery">Mystery</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="thriller">Thriller</SelectItem>
            <SelectItem value="horror">Horror</SelectItem>
            <SelectItem value="historical">Historical</SelectItem>
            <SelectItem value="adventure">Adventure</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Stories</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          {filteredStories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No stories found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button asChild>
                <Link href="/create">Create New Story</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={story.episodes[0].thumbnails[0] || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white font-bold text-lg">{story.title}</h3>
                      <p className="text-white/80 text-sm">{story.genre}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">{story.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {story.episodes.length} episodes
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/story/${story.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.slice(0, 3).map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={story.episodes[0].thumbnails[0] || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold text-lg">{story.title}</h3>
                    <p className="text-white/80 text-sm">{story.genre}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">{story.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {story.episodes.length} episodes
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/story/${story.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.slice(3, 6).map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={story.episodes[0].thumbnails[0] || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white font-bold text-lg">{story.title}</h3>
                    <p className="text-white/80 text-sm">{story.genre}</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">{story.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {story.episodes.length} episodes
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/story/${story.id}`}>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="mt-0">
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">Stories you mark as favorites will appear here</p>
            <Button asChild>
              <Link href="/create">Create New Story</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

