/**
 * App.tsx — DIVAKARAN A P Portfolio
 *
 * Preloader is rendered as a CSS OVERLAY on top of the portfolio.
 * The portfolio always renders underneath — the preloader just fades away.
 * This prevents the previous issue where the preloader gated all content.
 */

import { Suspense, lazy, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AmbientParticles from './components/layout/AmbientParticles'

// ── Preloader toggle ──────────────────────────────────────────────────────
const PRELOADER_ENABLED = true

// Lazy-load the preloader
const CinematicPreloader = PRELOADER_ENABLED
  ? lazy(() =>
      import('./components/preloader').then(m => ({
        default: m.CinematicPreloader,
      }))
    )
  : null

// Lazy load all section components
const Navbar               = lazy(() => import('./components/layout/Navbar'))
const Footer               = lazy(() => import('./components/layout/Footer'))
const CustomCursor         = lazy(() => import('./components/layout/CustomCursor'))
const HeroSection          = lazy(() => import('./components/sections/HeroSection'))
const AboutSection         = lazy(() => import('./components/sections/AboutSection'))
const SkillsSection        = lazy(() => import('./components/sections/SkillsSection'))
const ProjectsSection      = lazy(() => import('./components/sections/ProjectsSection'))
const ExperienceSection    = lazy(() => import('./components/sections/ExperienceSection'))
const AchievementsSection  = lazy(() => import('./components/sections/AchievementsSection'))
const CertificationsSection= lazy(() => import('./components/sections/CertificationsSection'))
const ResumeSection        = lazy(() => import('./components/sections/ResumeSection'))
const ContactSection       = lazy(() => import('./components/sections/ContactSection'))
const DivaAI               = lazy(() => import('./components/chat/DivaAI'))

const LoadingFallback = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', background: 'var(--color-black)',
  }}>
    <div style={{
      width: '36px', height: '36px',
      border: '2px solid rgba(255,107,0,0.15)',
      borderTop: '2px solid var(--color-orange)',
      borderRadius: '50%',
      animation: 'spin-slow 1s linear infinite',
    }} />
  </div>
)

function App() {
  const [preloaderDone, setPreloaderDone] = useState(!PRELOADER_ENABLED)

  // Safety net: force preloader off after 8 seconds
  useEffect(() => {
    if (preloaderDone) return
    const t = setTimeout(() => setPreloaderDone(true), 8000)
    return () => clearTimeout(t)
  }, [preloaderDone])

  return (
    <div style={{ background: 'var(--color-black)', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Cinematic noise texture overlay */}
      <div className="noise-overlay" />

      {/* Persistent ambient floating particles */}
      <AmbientParticles />

      {/* ── Preloader OVERLAY (fades away, never blocks content) ── */}
      <AnimatePresence>
        {!preloaderDone && CinematicPreloader && (
          <Suspense fallback={null}>
            <CinematicPreloader onComplete={() => setPreloaderDone(true)} />
          </Suspense>
        )}
      </AnimatePresence>

      {/* ── Portfolio content always renders underneath ── */}
      <Suspense fallback={<LoadingFallback />}>
        {/* Custom cursor — desktop only */}
        <CustomCursor />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: preloaderDone ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Navbar />

          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <AchievementsSection />
            <CertificationsSection />
            <ResumeSection />
            <ContactSection />
          </main>

          <Footer />
          <DivaAI />
        </motion.div>
      </Suspense>
    </div>
  )
}

export default App
