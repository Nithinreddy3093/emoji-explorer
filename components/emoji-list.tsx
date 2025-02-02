'use client'

import { useState } from 'react'
import { EmojiItem } from './emoji-item'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { emojiData, emojiCategories } from '../utils/emojiData'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/hooks/use-toast'
import { X } from 'lucide-react'

export function EmojiList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([])

  const filteredEmojis = emojiData.filter(
    (emoji) =>
      (emoji.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emoji.emoji.includes(searchTerm)) &&
      (selectedCategory === 'All' || emoji.category === selectedCategory)
  )

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
    <div className="space-y-4">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <Input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Categories</SelectItem>
            {emojiCategories.map((category) => (
              <SelectItem key={category.name} value={category.name}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmojis.map((emoji) => (
          <EmojiItem
            key={emoji.emoji}
            {...emoji}
            isSelected={selectedEmojis.includes(emoji.emoji)}
            onSelect={handleEmojiSelect}
          />
        ))}
      </div>
    </div>
  )
}

