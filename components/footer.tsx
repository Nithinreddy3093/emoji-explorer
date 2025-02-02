import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            Built by NITHIN REDDY MARTHALA. The source code is available on{" "}
            <Link href="https://github.com/Nithinreddy3093/emoji-explorer" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              GitHub
            </Link>
            . Visit my LinkedIn profile{" "}
            <Link href="https://www.linkedin.com/in/nithin-marthala/" target="_blank" rel="noreferrer" className="font-medium underline underline-offset-4">
              here
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}

