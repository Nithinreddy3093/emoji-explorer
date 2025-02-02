import JsonLd from '@/components/json-ld'
import { toolSchemas } from '@/utils/schema'
import { generateMetadata } from '@/utils/metadata'
import WordCounter from '@/components/word-counter'

export const metadata = generateMetadata({
  title: 'Word Counter - Count Words and Characters | EmojiExplorer',
  description: 'Free online word counter tool. Count words, characters, and spaces in your text with real-time updates.',
  path: '/word-counter',
  keywords: [
    'word counter',
    'character counter',
    'text counter',
    'online word count',
    'character count tool',
  ],
})

export default function WordCounterPage() {
  return (
    <>
      <JsonLd data={toolSchemas.wordCounter} />
      <div className="py-8">
        <WordCounter />
      </div>
    </>
  )
}

