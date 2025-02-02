type WebsiteSchema = {
  name: string;
  description: string;
  url: string;
  author?: {
    name: string;
    url?: string;
  };
}

type WebApplicationSchema = {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem: string;
  features?: string[];
}

export function generateWebsiteSchema(config: WebsiteSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.name,
    description: config.description,
    url: config.url,
    ...(config.author && {
      author: {
        '@type': 'Person',
        name: config.author.name,
        ...(config.author.url && { url: config.author.url }),
      },
    }),
  }
}

export function generateWebApplicationSchema(config: WebApplicationSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: config.name,
    description: config.description,
    url: config.url,
    applicationCategory: config.applicationCategory,
    operatingSystem: config.operatingSystem,
    ...(config.features && { featureList: config.features }),
  }
}

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://emojiexplorer.com'

// Base website schema configuration
export const websiteSchema = generateWebsiteSchema({
  name: 'EmojiExplorer',
  description: 'Discover, search, and use emojis with ease. Features include emoji search, categories, favorites, and useful tools like word counter.',
  url: baseUrl,
  author: {
    name: 'EmojiExplorer Team',
    url: baseUrl,
  },
})

// Tool-specific schemas
export const toolSchemas = {
  emojiPicker: generateWebApplicationSchema({
    name: 'Emoji Picker',
    description: 'Search, browse, and copy emojis easily. Organize by categories and save your favorites.',
    url: `${baseUrl}/`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    features: [
      'Emoji search',
      'Category organization',
      'Favorites system',
      'Multi-select and copy',
      'Dark mode support',
    ],
  }),
  wordCounter: generateWebApplicationSchema({
    name: 'Word Counter',
    description: 'Count words, characters, and spaces in your text with real-time updates.',
    url: `${baseUrl}/word-counter`,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    features: [
      'Word count',
      'Character count',
      'Character count without spaces',
      'Real-time updates',
      'Copy and paste support',
    ],
  }),
}

