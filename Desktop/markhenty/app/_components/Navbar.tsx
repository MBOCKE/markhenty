'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#qui-sommes-nous', label: 'Qui sommes nous?' },
    { href: '#valeurs', label: 'Nos valeurs' },
    { href: '#contact', label: 'Contacts' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/95 backdrop-blur-md shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
        {/* Logo inside Blue Box (left-aligned, top-aligned) */}
        <div className="absolute top-2 left-6 z-50">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center justify-center bg-[#1a3a8f] px-6 py-6 pb-4 shadow-lg hover:bg-[#152e72] transition-colors"
          >
            <div className="relative w-28 h-8">
              <Image
                src="/images/markhenty-logo.png"
                alt="Markhenty Logo"
                fill
                className="object-contain"
                sizes="112px"
                priority

              />
            </div>
          </a>
        </div>

        {/* Space holder for the absolute logo */}
        <div className="w-40 h-8" />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[#1a3a8f] hover:text-[#2563eb] text-sm font-bold tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none z-50"
          aria-label="Toggle Menu"
        >
          <span
            className={`h-0.5 bg-[#1a3a8f] rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'w-6 rotate-45 translate-y-[8px]' : 'w-6'
            }`}
          />
          <span
            className={`h-0.5 bg-[#1a3a8f] rounded-full transition-all duration-300 ${
              mobileMenuOpen ? 'w-0 opacity-0' : 'w-4 self-end'
            }`}
          />
          <span
            className={`h-0.5 bg-[#1a3a8f] rounded-full transition-all duration-300 origin-center ${
              mobileMenuOpen ? 'w-6 -rotate-45 -translate-y-[8px]' : 'w-6'
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[#1a3a8f] hover:text-[#2563eb] text-base font-bold tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
