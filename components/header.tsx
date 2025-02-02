'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MoonIcon, SunIcon, MenuIcon, XIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/categories', label: 'Categories' },
  { href: '/favorites', label: 'Favorites' },
  { href: '/word-counter', label: 'Word Counter' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🎭</span>
          <span className="font-bold hidden sm:inline-block">EmojiExplorer</span>
        </Link>
        <div className="flex-1" />
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="ml-4"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </div>
      {isOpen && (
        <div className="md:hidden mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-col space-y-4 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

