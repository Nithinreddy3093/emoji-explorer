'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { HeartIcon, CheckIcon, CopyIcon } from 'lucide-react'

interface EmojiItemProps {
  emoji: string
  name: string
  category: string
  isSelected?: boolean
  onSelect?: (emoji: string) => void
}

export function EmojiItem({ emoji, name, category, isSelected = false, onSelect }: EmojiItemProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setIsFavorite(favorites.includes(emoji))
  }, [emoji])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (isFavorite) {
      const newFavorites = favorites.filter((fav: string) => fav !== emoji)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setIsFavorite(false)
      toast({
        title: 'Removed from favorites',
        description: `${emoji} has been removed from your favorites.`,
      })
    } else {
      favorites.push(emoji)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      setIsFavorite(true)
      toast({
        title: 'Added to favorites',
        description: `${emoji} has been added to your favorites.`,
      })
    }
  }

  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(emoji).then(() => {
      setCopied(true)
      toast({
        title: 'Copied!',
        description: `${emoji} has been copied to your clipboard.`,
      })
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleClick = () => {
    if (onSelect) {
      onSelect(emoji)
    }
  }

  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary ${
        isSelected ? 'bg-accent' : ''
      }`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`${name} emoji. Press Enter to select.`}
    >
      <div className="flex items-center space-x-4">
        <span className="text-4xl" aria-hidden="true">{emoji}</span>
        <div className="flex flex-col">
          <span className="font-medium">{name}</span>
          <span className="text-sm text-muted-foreground">{category}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button 
          onClick={toggleFavorite}
          variant="ghost" 
          size="icon"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon className={`h-4 w-4 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
        </Button>
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          size="icon"
          aria-label="Copy emoji"
        >
          <CopyIcon className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
        </Button>
        {isSelected && (
          <CheckIcon className="h-5 w-5 text-primary" />
        )}
      </div>
    </div>
  )
}

