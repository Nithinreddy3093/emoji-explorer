export default function AboutPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About EmojiExplorer</h1>
      <div className="prose dark:prose-invert mx-auto">
        <p>
          EmojiExplorer is a user-friendly website designed to help you discover, search, and use emojis with ease. 
          Our platform offers a comprehensive collection of emojis, organized into categories for simple navigation.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Browse emojis by category</li>
          <li>Search for specific emojis</li>
          <li>Copy emojis to your clipboard with a single click</li>
          <li>Save your favorite emojis for quick access</li>
          <li>Dark mode for comfortable viewing in low-light environments</li>
        </ul>
        <p>
          Whether you're looking for the perfect emoji for your social media post, trying to add some flair to your 
          messages, or just exploring the world of emojis, EmojiExplorer has got you covered.
        </p>
        <p>
          We're constantly updating our emoji collection to ensure you have access to the latest and most popular emojis. 
          If you have any suggestions or feedback, we'd love to hear from you!
        </p>
      </div>
    </div>
  )
}

