'use client'

import { useState, useEffect } from 'react'
import { EmojiItem } from './emoji-item'
import { emojiData } from '@/utils/emojiData'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { X } from 'lucide-react'

// Define the Emoji type
type Emoji = {
  emoji: string;
  name: string;
  category: string;
}

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Emoji[]>([])
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    const favoriteEmojis = emojiData.filter((emoji) => storedFavorites.includes(emoji.emoji))
    setFavorites(favoriteEmojis)
  }, [])

  const handleEmojiSelect = (emoji: string) => {
    setSelectedEmojis((prev) =>
      prev.includes(emoji) ? prev.filter((e) => e !== emoji) : [...prev, emoji]
    )
  }

  const copySelectedEmojis = () => {
    if (selectedEmojis.length > 0) {
      navigator.clipboard.writeText(selectedEmojis.join('')).then(() => {
        toast({
          title: 'Copied!',
          description: `${selectedEmojis.length} emoji${selectedEmojis.length > 1 ? 's' : ''} copied to clipboard.`,
        })
      })
    }
  }

  const clearSelection = () => {
    setSelectedEmojis([])
    toast({
      title: 'Selection cleared',
      description: 'All selected emojis have been deselected.',
    })
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Your Favorite Emojis</h1>
      {favorites.length > 0 ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-muted-foreground">
              {selectedEmojis.length} emoji{selectedEmojis.length !== 1 ? 's' : ''} selected
            </span>
            <div className="space-x-2">
              <Button
                onClick={clearSelection}
                variant="outline"
                size="sm"
                disabled={selectedEmojis.length === 0}
              >
                <X className="h-4 w-4 mr-2" />
                Clear Selection
              </Button>
              <Button
                onClick={copySelectedEmojis}
                disabled={selectedEmojis.length === 0}
              >
                Copy Selected ({selectedEmojis.length})
              </Button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {favorites.map((emoji) => (
              <EmojiItem
                key={emoji.emoji}
                emoji={emoji.emoji}
                name={emoji.name}
                category={emoji.category}
                isSelected={selectedEmojis.includes(emoji.emoji)}
                onSelect={handleEmojiSelect}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          You haven't added any emojis to your favorites yet.
        </p>
      )}
    </div>
  )
}

