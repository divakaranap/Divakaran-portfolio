import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Smooth spring physics for fluid progress bar movement
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 120,
    damping: prefersReducedMotion ? 100 : 28,
    restDelta: 0.001,
  })

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 1001,
        pointerEvents: 'none',
        background: 'rgba(10, 10, 15, 0.4)',
      }}
      aria-hidden="true"
    >
      {/* Background track track glow */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformOrigin: '0% 50%',
          scaleX,
          background: 'linear-gradient(90deg, #00D4FF 0%, #06B6D4 35%, #8B5CF6 70%, #EC4899 100%)',
          boxShadow: '0 0 14px rgba(0, 212, 255, 0.8), 0 0 4px rgba(139, 92, 246, 0.6)',
        }}
      />
    </div>
  )
}

export default ScrollProgress
