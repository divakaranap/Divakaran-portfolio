import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const personalEmail = 'divakaranperumal27@gmail.com'

const RESUME_URL = '/DivakaranAP.pdf'

// ── Nav items ────────────────────────────────────────────────────────────
const navItems = [
  { id: 'hero',         label: 'HOME' },
  { id: 'projects',     label: 'WORK' },
  { id: 'about',        label: 'ABOUT' },
  { id: 'skills',       label: 'SKILLS' },
  { id: 'resume',       label: 'RESUME',  isExternal: true },
  { id: 'contact',      label: 'CONTACT' },
]

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled]         = useState(false)
  const [isVisible, setIsVisible]           = useState(true)
  const [lastScrollY, setLastScrollY]       = useState(0)
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [activeSection, setActiveSection]   = useState('hero')
  const [hovered, setHovered]               = useState<string | null>(null)
  const [isMobile, setIsMobile]             = useState(false)

  // ── Responsive check ──
  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 860); if (window.innerWidth >= 860) setMobileOpen(false); }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Scroll behaviour ──
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setIsScrolled(y > 30)
      if (y <= 60) { setIsVisible(true) }
      else if (y > lastScrollY + 10) { setIsVisible(false) }
      else if (y < lastScrollY - 6) { setIsVisible(true) }
      setLastScrollY(y)

      // Active section detection
      const ids = ['contact', 'experience', 'projects', 'skills', 'about', 'hero']
      const offset = 200
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el) {
          const r = el.getBoundingClientRect()
          if (r.top <= offset && r.bottom >= offset) { setActiveSection(id); break }
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  // ── Lock body scroll when mobile menu is open ──
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    if (id === 'resume') { window.open(RESUME_URL, '_blank', 'noopener'); return }
    setActiveSection(id)
    if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 76
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: (isVisible || mobileOpen) ? 0 : -100,
          opacity: (isVisible || mobileOpen) ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          backgroundColor: isScrolled ? 'rgba(5,5,5,0.9)' : 'rgba(5,5,5,0.02)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(255,107,0,0.1)' : '1px solid transparent',
          boxShadow: isScrolled ? '0 8px 32px rgba(0,0,0,0.6)' : 'none',
          transition: 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        {/* Orange scroll progress line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: 'var(--gradient-fire)',
            width: `${Math.min((lastScrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 || 0, 100)}%`,
            transition: 'width 0.1s linear',
          }} />
        </div>

        <div style={{
          maxWidth: 'var(--container-max)', margin: '0 auto',
          padding: '0 2rem', height: '72px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0',
            }}
            aria-label="Scroll to home"
          >
            {/* DIVAKARAN square badge */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px',
              background: 'var(--gradient-fire)',
              borderRadius: '6px',
              boxShadow: '0 0 20px rgba(255,107,0,0.4)',
            }}>
              <span style={{
                fontFamily: 'var(--font-headline)',
                fontWeight: 900, fontSize: '1rem',
                color: '#fff', letterSpacing: '0.08em',
              }}>D</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{
                fontFamily: 'var(--font-headline)', fontWeight: 800,
                fontSize: '0.85rem', letterSpacing: '0.08em', color: '#fff',
              }}>DIVAKARAN</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                letterSpacing: '0.12em', color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}>AI & ML ENGINEER</span>
            </div>
          </button>

          {/* Desktop nav links */}
          {!isMobile && (
            <nav aria-label="Main Navigation" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {navItems.map(item => {
                const isActive = activeSection === item.id || (item.id === 'hero' && activeSection === '')
                const isHov = hovered === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '0.5rem 1.1rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: isActive ? 'var(--color-orange)' : isHov ? '#fff' : 'var(--color-text-muted)',
                      transition: 'color 0.2s ease',
                      borderRadius: '4px',
                    }}
                  >
                    {item.label}
                    {/* Active underline */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        style={{
                          position: 'absolute', bottom: '2px', left: '15%', right: '15%', height: '1.5px',
                          background: 'var(--gradient-fire)',
                          borderRadius: '2px',
                          boxShadow: '0 0 8px rgba(255,107,0,0.8)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                )
              })}
              {/* Resume download button */}
              <a
                href={RESUME_URL}
                download="DivakaranAP.pdf"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                  padding: '0.5rem 1.2rem',
                  background: 'var(--gradient-fire)',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  border: 'none', borderRadius: '4px', cursor: 'pointer',
                  textDecoration: 'none',
                  boxShadow: '0 0 20px rgba(255,107,0,0.3)',
                  marginLeft: '0.6rem',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(255,107,0,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(255,107,0,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                RESUME
              </a>
            </nav>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '40px', height: '40px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff', cursor: 'pointer',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 99,
              backgroundColor: 'rgba(5,5,5,0.97)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              display: 'flex', flexDirection: 'column',
              padding: '7rem 2rem 2.5rem',
            }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.2em', color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
              }}>NAVIGATE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => scrollTo(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1.1rem 1.4rem',
                    background: activeSection === item.id ? 'rgba(255,107,0,0.1)' : 'rgba(255,255,255,0.025)',
                    border: `1px solid ${activeSection === item.id ? 'rgba(255,107,0,0.35)' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 'var(--radius-md)',
                    color: '#fff', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-headline)', fontSize: '1.6rem',
                    fontWeight: 800, letterSpacing: '0.04em',
                    color: activeSection === item.id ? 'var(--color-orange)' : '#fff',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                    color: 'var(--color-text-muted)', letterSpacing: '0.12em',
                  }}>0{i + 1}</span>
                </motion.button>
              ))}
            </div>
            <div style={{
              marginTop: 'auto', paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: 'var(--color-text-muted)', letterSpacing: '0.12em',
              textAlign: 'center',
            }}>
              DIVAKARAN / AI & ML ENGINEER • CHENNAI, INDIA
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
