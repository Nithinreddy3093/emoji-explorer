import { EmojiList } from '@/components/emoji-list'
import JsonLd from '@/components/json-ld'
import { toolSchemas } from '@/utils/schema'
import { generateMetadata } from '@/utils/metadata'

export const metadata = generateMetadata({
  title: 'EmojiExplorer - Find and Copy Emojis Easily',
  description: 'Search, browse, and copy emojis with our easy-to-use emoji picker. Organize by categories and save your favorites.',
  keywords: [
    'emoji picker',
    'emoji search',
    'emoji categories',
    'copy emojis',
    'emoji favorites',
  ],
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={toolSchemas.emojiPicker} />
      <div className="py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Emoji Explorer</h1>
        <p className="text-center mb-8 text-lg text-muted-foreground">
          Discover, search, and copy your favorite emojis with ease! Copy individual emojis or select multiple emojis to copy them all at once.
        </p>
        <EmojiList />
      </div>
    </>
  )
}

