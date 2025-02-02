import Link from 'next/link'
import { emojiCategories } from '@/utils/emojiData'
import { generateMetadata } from '@/utils/metadata'

export const metadata = generateMetadata({
  title: 'Emoji Categories - Browse Emojis by Category | EmojiExplorer',
  description: 'Browse emojis by category. Find the perfect emoji organized in categories like Smileys, People, Animals, Food, and more.',
  path: '/categories',
  keywords: [
    'emoji categories',
    'emoji groups',
    'organized emojis',
    'emoji finder',
    'categorized emojis',
  ],
})

export default function CategoriesPage() {
  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Emoji Categories</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {emojiCategories.map((category) => (
          <Link
            key={category.name}
            href={`/categories/${encodeURIComponent(category.name)}`}
            className="flex items-center p-4 border rounded-lg hover:bg-accent transition-colors duration-200"
          >
            <span className="text-4xl mr-4">{category.icon}</span>
            <span className="text-lg font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

