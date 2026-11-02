'use client'

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E2D8] py-14 bg-[#FAF7F2]">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-6">
          <a
            href="mailto:maazabdulbasith@gmail.com"
            className="text-xs font-semibold text-slate-500 tracking-wider hover:text-accent transition-colors"
          >
            Email
          </a>
          <a
            href="https://github.com/maazabdulbasith"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 tracking-wider hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/abdul-basith-maaz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-500 tracking-wider hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="tel:+919901061725"
            className="text-xs font-semibold text-slate-500 tracking-wider hover:text-accent transition-colors"
          >
            Phone
          </a>
        </div>

        {/* Stamp */}
        <p className="text-xs font-medium text-slate-400">
          Designed &amp; built by <span className="text-accent font-bold">Abdul Basith Maaz</span> · Bengaluru, India
        </p>
      </div>
    </footer>
  )
}
