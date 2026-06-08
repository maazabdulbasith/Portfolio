'use client'

export default function Footer() {
  return (
    <footer className="border-t border-surface-3 py-12">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-8">
          <a
            href="mailto:maazabdulbasith@gmail.com"
            className="text-xs text-txt-tertiary tracking-wider hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/maazabdulbasith"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-txt-tertiary tracking-wider hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/abdul-basith-maaz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-txt-tertiary tracking-wider hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="tel:+919901061725"
            className="text-xs text-txt-tertiary tracking-wider hover:text-accent transition-colors"
          >
            Phone
          </a>
        </div>

        {/* Stamp */}
        <p className="text-[11px] text-txt-tertiary tracking-[1.5px]">
          Built by <span className="text-accent">Maaz</span>. Not from a template.
        </p>
      </div>
    </footer>
  )
}
