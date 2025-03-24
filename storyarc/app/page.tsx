import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold">Project StoryArc</h1>
          <nav className="ml-auto flex gap-4">
            <Link href="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <Link href="/create">
              <Button variant="ghost">Create</Button>
            </Link>
            <Link href="/library">
              <Button variant="ghost">Library</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Immersive Storytelling
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Project StoryArc transforms traditional storytelling by turning a manual, time-consuming process into
                  a dynamic, AI-powered narrative engine which crafts immersive, multi-episode stories, mood-setting
                  audio, and eye-catching visuals.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/create">
                    <Button className="w-full min-[400px]:w-auto">
                      Create Your Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/library">
                    <Button variant="outline" className="w-full min-[400px]:w-auto">
                      Browse Library
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <img
                  src="/placeholder.svg?height=720&width=1280"
                  alt="Hero image"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered engine takes your ideas and transforms them into complete stories with audio and
                  visuals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Input Your Idea</h3>
                <p className="text-muted-foreground">
                  Provide a genre, topic, or concept and specify how many episodes you want.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">AI Generation</h3>
                <p className="text-muted-foreground">
                  Our engine crafts a narrative blueprint, generates audio, and creates eye-catching thumbnails.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Enjoy & Share</h3>
                <p className="text-muted-foreground">
                  Experience your immersive story with audio and visuals, and share it with others.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Project StoryArc offers a range of features to enhance your storytelling experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">AI-Powered Narratives</h3>
                <p className="text-muted-foreground">
                  Our engine crafts intricate character relationships and thematic layers.
                </p>
              </div>
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Immersive Audio</h3>
                <p className="text-muted-foreground">
                  AI-generated audio that fits the story and enhances the experience.
                </p>
              </div>
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Eye-Catching Thumbnails</h3>
                <p className="text-muted-foreground">Choose from 5 different thumbnail themes for each episode.</p>
              </div>
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Memory Components</h3>
                <p className="text-muted-foreground">Tracks overall story arc and maintains episode consistency.</p>
              </div>
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Low-Bandwidth Optimization</h3>
                <p className="text-muted-foreground">
                  Optimized for low-bandwidth networks with compressed audio and optimized thumbnails.
                </p>
              </div>
              <div className="flex flex-col space-y-2 p-6 bg-background rounded-lg shadow">
                <h3 className="text-xl font-bold">Audience Feedback</h3>
                <p className="text-muted-foreground">
                  Uses reinforcement learning to improve based on audience feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Project StoryArc. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

