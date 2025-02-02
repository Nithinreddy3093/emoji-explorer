'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CopyIcon, ClipboardPasteIcon } from 'lucide-react'
import { toast } from '@/hooks/use-toast'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [counts, setCounts] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0
  })

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length

    setCounts({
      words,
      characters,
      charactersNoSpaces
    })
  }, [text])

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      setText(clipboardText)
      toast({
        title: 'Text pasted',
        description: 'Text has been pasted from clipboard.',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to paste from clipboard.',
        variant: 'destructive',
      })
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: 'Copied!',
        description: 'Text has been copied to clipboard.',
      })
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">
        Straightforward Word & Character Counter
      </h1>
      <p className="text-center text-muted-foreground mb-8">
        Precision at your fingertips: Count words, measure characters, and craft perfect content in seconds.
      </p>

      {/* Counter Display */}
      <div className="bg-muted/50 p-6 rounded-lg mb-6">
        <div className="flex justify-center items-center gap-2 text-4xl font-mono">
          {String(counts.characters).padStart(7, '0').split('').map((digit, i) => (
            <div
              key={i}
              className={`w-12 h-16 flex items-center justify-center rounded ${
                i >= String(counts.characters).length
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground'
              }`}
            >
              {digit}
            </div>
          ))}
        </div>
      </div>

      {/* Input Controls */}
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handlePaste}
        >
          <ClipboardPasteIcon className="h-4 w-4" />
          Paste from clipboard
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handleCopy}
          disabled={!text}
        >
          <CopyIcon className="h-4 w-4" />
          Copy
        </Button>
      </div>

      {/* Text Input */}
      <Textarea
        placeholder="Start typing or paste your text here..."
        className="min-h-[200px] mb-6"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Results */}
      <div className="border rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold p-4 border-b bg-muted/50">
          Counter Results
        </h2>
        <div className="divide-y">
          <div className="flex justify-between p-4">
            <span>Words</span>
            <span className="font-mono">{counts.words}</span>
          </div>
          <div className="flex justify-between p-4">
            <span>Characters</span>
            <span className="font-mono">{counts.characters}</span>
          </div>
          <div className="flex justify-between p-4">
            <span>Characters (without spaces)</span>
            <span className="font-mono">{counts.charactersNoSpaces}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

