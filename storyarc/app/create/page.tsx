"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"

export default function CreatePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    concept: "",
    genre: "",
    episodes: 3,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenreChange = (value: string) => {
    setFormData((prev) => ({ ...prev, genre: value }))
  }

  const handleEpisodesChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, episodes: value[0] }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      // Generate a random ID for the story
      const storyId = Math.random().toString(36).substring(2, 10)
      router.push(`/story/${storyId}`)
    }, 3000)
  }

  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-bold mb-6">Create Your Story</h1>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Story Details</CardTitle>
            <CardDescription>
              Provide details about your story and our AI will generate a complete narrative with audio and visuals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Story Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a title for your story"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concept">Concept or Prompt</Label>
              <Textarea
                id="concept"
                name="concept"
                placeholder="Describe your story concept, main characters, or setting"
                value={formData.concept}
                onChange={handleChange}
                required
                className="min-h-[120px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Select value={formData.genre} onValueChange={handleGenreChange} required>
                <SelectTrigger id="genre">
                  <SelectValue placeholder="Select a genre" />
                </SelectTrigger>
                <SelectContent>
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
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="episodes">Number of Episodes</Label>
                <span className="text-muted-foreground">{formData.episodes}</span>
              </div>
              <Slider
                id="episodes"
                min={1}
                max={10}
                step={1}
                value={[formData.episodes]}
                onValueChange={handleEpisodesChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Story...
                </>
              ) : (
                "Generate Story"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

