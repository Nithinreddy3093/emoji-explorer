import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import JsonLd from '@/components/json-ld'
import { websiteSchema } from '@/utils/schema'
import { generateMetadata } from '@/utils/metadata'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = generateMetadata({
  title: 'EmojiExplorer - Emoji Search, Word Counter, and More',
  description: 'Discover and copy emojis easily, count words and characters, and access useful text tools. Features include emoji categories, favorites, and real-time word counting.',
  keywords: [
    'emoji',
    'emoji picker',
    'word counter',
    'character counter',
    'text tools',
    'emoji search',
    'emoji categories',
  ],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

