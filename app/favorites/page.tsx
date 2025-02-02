import { generateMetadata } from '@/utils/metadata'
import { FavoritesList } from '@/components/favorites-list'

export const metadata = generateMetadata({
  title: 'Favorite Emojis - Your Saved Emojis | EmojiExplorer',
  description: 'Access your favorite and most used emojis in one place. Quickly copy and use your saved emojis.',
  path: '/favorites',
  keywords: [
    'favorite emojis',
    'saved emojis',
    'emoji collection',
    'personal emojis',
    'emoji favorites',
  ],
})

export default function FavoritesPage() {
  return <FavoritesList />
}

