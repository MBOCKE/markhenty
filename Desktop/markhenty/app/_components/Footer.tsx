'use client'

import { useState } from 'react'
import Image from 'next/image'
import { contactInfo } from '../_lib/data'

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate contact form submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1200)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative bg-[#0f172a] pt-20 pb-8 px-6 noise-texture border-t border-white/5">
      {/* Background Graphic - Footer Masks */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none select-none z-0">
        <Image
          src="/images/masks-footer.png"
          alt="Masks Footer Background"
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Info & Details */}
          <div className="lg:col-span-5 flex flex-col text-left">
            <div className="relative w-40 h-10 mb-6">
              <Image
                src="/images/markhenty-logo.png"
                alt="Markhenty Logo"
                fill
                className="object-contain filter brightness-0 invert"
                sizes="160px"
              />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-8 max-w-sm font-medium">
              Votre partenaire de croissance stratégique et de brand management. Ensemble, façonnons des marques d'exception.
            </p>

            <div className="space-y-5">
              <div className="flex flex-col">
                <span className="text-gold text-[9px] uppercase font-bold tracking-widest mb-1">
                  Téléphone
                </span>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-gold transition-colors font-bold text-sm tracking-wide"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-gold text-[9px] uppercase font-bold tracking-widest mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-white hover:text-gold transition-colors font-bold text-sm tracking-wide"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-gold text-[9px] uppercase font-bold tracking-widest mb-1">
                  Site Web
                </span>
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gold transition-colors font-bold text-sm tracking-wide"
                >
                  {contactInfo.website}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 w-full flex flex-col text-left text-white">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="h-[1px] w-6 bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.25em]">
                NOUS CONTACTER
              </span>
            </div>
            <h3 className="text-white text-section-title uppercase font-black mb-8">
              Parlons de Votre Projet.
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">
                    Nom Complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Votre nom"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">
                    Email Professionnel
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="nom@entreprise.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Objet de votre message"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="text-white/60 text-xs font-bold uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Décrivez votre besoin stratégique..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-3.5 bg-gold text-dark font-extrabold uppercase text-xs tracking-widest rounded-full transition-all duration-300 hover:shadow-glow-gold hover:-translate-y-[2px] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le Message'}
                </button>

                {status === 'success' && (
                  <span className="text-emerald-400 text-sm font-semibold animate-fade-in">
                    ✓ Votre message a été envoyé. Nous vous recontacterons sous 24 heures.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Row: Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <span className="text-white/40 text-xs font-medium">
            &copy; {new Date().getFullYear()} MARKHENTY CONSULTING. Tous droits réservés.
          </span>

          <button
            onClick={scrollToTop}
            className="text-white/45 hover:text-gold text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            Retour en haut <span className="text-sm">↑</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
