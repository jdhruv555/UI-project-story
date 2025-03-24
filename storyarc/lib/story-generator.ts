import type { StoryData } from "./types"

// Function to generate a random story based on an ID
export function generateStory(id: string): StoryData {
  // Use the ID as a seed for "randomness"
  const seed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)

  // Generate a genre based on the seed
  const genres = ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Thriller", "Horror", "Historical", "Adventure", "Comedy"]
  const genre = genres[seed % genres.length]

  // Generate a title based on the genre
  const titles = {
    Fantasy: ["The Crystal Kingdom", "Whispers of Magic", "The Last Enchanter"],
    "Sci-Fi": ["Quantum Paradox", "The Mars Colony", "Beyond the Stars"],
    Mystery: ["The Silent Witness", "Shadows in the Fog", "The Forgotten Case"],
    Romance: ["Hearts Entwined", "Summer Love", "The Unexpected Match"],
    Thriller: ["The Silent Killer", "Midnight Chase", "The Perfect Crime"],
    Horror: ["Whispers in the Dark", "The Haunting", "Shadows of Fear"],
    Historical: ["The Tudor Secret", "Echoes of War", "The Victorian Mystery"],
    Adventure: ["The Lost Expedition", "Treasure Hunters", "Journey to the Unknown"],
    Comedy: ["The Misadventures of Tim", "Family Chaos", "Office Shenanigans"],
  }

  const title = titles[genre][seed % 3]

  // Generate a description based on the genre and title
  const descriptions = {
    Fantasy: `In a world where magic flows like water and creatures of legend roam freely, ${title} takes you on an epic journey of discovery and wonder.`,
    "Sci-Fi": `Set in a future where technology has advanced beyond our wildest dreams, ${title} explores the consequences of humanity's relentless pursuit of progress.`,
    Mystery: `A puzzling case that has baffled the authorities for years, ${title} follows a brilliant detective as they unravel the threads of a complex mystery.`,
    Romance: `Two souls destined to meet, ${title} is a heartwarming tale of love, loss, and the courage to open your heart again.`,
    Thriller: `A race against time, ${title} will keep you on the edge of your seat as the protagonist navigates a web of deceit and danger.`,
    Horror: `Prepare to be terrified as ${title} delves into the darkest corners of the human psyche and the supernatural forces that lurk in the shadows.`,
    Historical: `Set against the backdrop of a pivotal moment in history, ${title} weaves fact and fiction into a compelling narrative of courage and resilience.`,
    Adventure: `Embark on an epic journey with ${title}, where danger lurks around every corner and only the brave will survive.`,
    Comedy: `Laugh out loud with ${title}, a hilarious tale of mishaps, misunderstandings, and the absurdity of everyday life.`,
  }

  const description = descriptions[genre]

  // Generate episodes
  const numEpisodes = 3 + (seed % 3) // 3-5 episodes
  const episodes = []

  for (let i = 0; i < numEpisodes; i++) {
    const episodeTitles = {
      Fantasy: ["The Awakening", "The Journey Begins", "The Dark Forest", "The Mountain of Fire", "The Final Battle"],
      "Sci-Fi": ["First Contact", "The Discovery", "The Anomaly", "The Time Shift", "The Return"],
      Mystery: ["The Body", "The Suspects", "The Clue", "The Revelation", "The Truth"],
      Romance: ["The Meeting", "The Misunderstanding", "The Reconciliation", "The Proposal", "The Wedding"],
      Thriller: ["The Warning", "The Chase", "The Trap", "The Escape", "The Confrontation"],
      Horror: ["The House", "The Presence", "The Possession", "The Exorcism", "The Aftermath"],
      Historical: ["The Beginning", "The Conflict", "The Battle", "The Resolution", "The Legacy"],
      Adventure: ["The Map", "The Journey", "The Island", "The Treasure", "The Return"],
      Comedy: ["The Mistake", "The Confusion", "The Misunderstanding", "The Resolution", "The Party"],
    }

    const episodeTitle = episodeTitles[genre][i]

    // Generate placeholder content
    const content = `
    In this episode of ${title}, we follow our protagonist as they navigate the challenges of ${episodeTitle.toLowerCase()}.
    
    The story begins with a surprising revelation that changes everything they thought they knew. As they process this new information, they must make difficult decisions that will affect not only their own future but the futures of those around them.
    
    Along the way, they encounter allies and adversaries, each with their own motivations and secrets. Trust becomes a precious commodity as the lines between friend and foe blur.
    
    As the episode progresses, tension builds to a climactic confrontation that leaves our protagonist forever changed. The episode ends with a tantalizing cliffhanger, setting the stage for what comes next.
    `

    const summary = `In "${episodeTitle}", our protagonist faces a life-changing revelation and must navigate a complex web of allies and adversaries to uncover the truth.`

    // Generate placeholder audio URL
    const audioUrl = `/placeholder-audio-${i + 1}.mp3`

    // Generate placeholder thumbnails
    const thumbnails = []
    for (let j = 0; j < 5; j++) {
      thumbnails.push(`/placeholder.svg?height=720&width=1280&text=Episode ${i + 1} Thumbnail ${j + 1}`)
    }

    // Generate random duration between 15-30 minutes
    const minutes = 15 + ((seed + i) % 16)
    const duration = `${minutes}:00`

    episodes.push({
      title: episodeTitle,
      content,
      summary,
      audioUrl,
      thumbnails,
      duration,
    })
  }

  // Generate a random date within the last month
  const date = new Date()
  date.setDate(date.getDate() - (seed % 30))
  const createdAt = date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })

  return {
    id,
    title,
    description,
    genre,
    createdAt,
    episodes,
  }
}

// Function to generate a library of stories
export function generateLibrary(): StoryData[] {
  const stories = []

  // Generate 9 stories with different IDs
  for (let i = 0; i < 9; i++) {
    const id = Math.random().toString(36).substring(2, 10)
    stories.push(generateStory(id))
  }

  return stories
}

