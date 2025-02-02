'use client'

import { useParams } from 'next/navigation'
import { EmojiItem } from '@/components/emoji-item'
import { emojiData } from '@/utils/emojiData'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { X } from 'lucide-react'

export default function CategoryPage() {
  const params = useParams()
  const category = decodeURIComponent(params.category as string)
  
  const categoryEmojis = emojiData.filter(emoji => emoji.category === category)

  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])

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
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">{category}</h1>
      {categoryEmojis.length > 0 ? (
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
            {categoryEmojis.map((emoji) => (
              <EmojiItem
                key={emoji.emoji}
                {...emoji}
                isSelected={selectedEmojis.includes(emoji.emoji)}
                onSelect={handleEmojiSelect}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-lg text-muted-foreground">
          No emojis found in this category.
        </p>
      )}
    </div>
  )
}

