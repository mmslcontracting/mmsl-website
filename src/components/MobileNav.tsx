import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        aria-label="menu"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-60 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-gray-800 transition-all duration-300 ${
            isOpen ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <nav
        className={`fixed top-0 right-0 z-50 flex h-full w-[80%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        {/* Header */}
        <div className="flex h-[13vh] items-center justify-between border-b border-gray-100 px-6">
          <a href="/" onClick={() => setIsOpen(false)}>
            <img
              src="/images/logo.jpg"
              alt="MMSL Contracting Corp logo"
              className="h-12 w-auto"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group hover:text-secondary flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <span className="bg-secondary h-1.5 w-1.5 rounded-full opacity-0 transition-opacity group-hover:opacity-100" />
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="border-t border-gray-100 p-6">
          <a
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="btn-gold block w-full rounded-lg px-6 py-3 text-center text-base font-semibold text-gray-900 transition"
          >
            Get Free Quote
          </a>
          <p className="mt-4 text-center text-sm text-gray-500">
            Call us:{' '}
            <a
              href="tel:+1-631-805-6259"
              className="hover:text-secondary font-medium text-gray-700"
            >
              (631) 805-6259
            </a>
          </p>
        </div>
      </nav>
    </>
  )
}
