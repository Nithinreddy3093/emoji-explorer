import { Metadata } from 'next'
import { baseUrl } from './schema'

type GenerateMetadataProps = {
  title: string
  description: string
  path?: string
  keywords?: string[]
}

export function generateMetadata({
  title,
  description,
  path = '',
  keywords = [],
}: GenerateMetadataProps): Metadata {
  const url = `${baseUrl}${path}`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'EmojiExplorer',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

