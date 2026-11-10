import React, { useEffect, useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ────────────────────────────────────────────────────────────────────────────
   Premium Custom Cursor — orange glow + trailing ring + particle trail
   ──────────────────────────────────────────────────────────────────────── */

interface Trail { x: number; y: number; age: number; id: number }

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click' | 'text'>('default')
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const trailCanvasRef = useRef<HTMLCanvasElement>(null)

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Spring physics: fast dot, smooth trailing ring
  const dotX = useSpring(mouseX, { stiffness: 1200, damping: 40, restDelta: 0.001 })
  const dotY = useSpring(mouseY, { stiffness: 1200, damping: 40, restDelta: 0.001 })

  const ringX = useSpring(mouseX, { stiffness: 180, damping: 20, restDelta: 0.001 })
  const ringY = useSpring(mouseY, { stiffness: 180, damping: 20, restDelta: 0.001 })

  // Particle trail
  const trailsRef = useRef<Trail[]>([])
  const trailIdRef = useRef(0)
  const lastPosRef = useRef({ x: -100, y: -100 })

  // Particle trail canvas
  useEffect(() => {
    if (isTouchDevice) return
    const canvas = trailCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const trails = trailsRef.current

      for (let i = trails.length - 1; i >= 0; i--) {
        trails[i].age += 1
        if (trails[i].age > 20) {
          trails.splice(i, 1)
          continue
        }
        const alpha = Math.max(0, 1 - trails[i].age / 20) * 0.4
        const size = Math.max(0.5, (1 - trails[i].age / 20) * 2.5)
        ctx.beginPath()
        ctx.arc(trails[i].x, trails[i].y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 0, ${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [isTouchDevice])

  // Add trail particles on mouse move
  const addTrailParticle = useCallback((x: number, y: number) => {
    const dx = x - lastPosRef.current.x
    const dy = y - lastPosRef.current.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist > 6) {
      trailsRef.current.push({ x, y, age: 0, id: trailIdRef.current++ })
      lastPosRef.current = { x, y }
      // Keep trail manageable
      if (trailsRef.current.length > 40) trailsRef.current.shift()
    }
  }, [])

  useEffect(() => {
    const checkPointer = () => {
      const finePointer = window.matchMedia('(pointer: fine)').matches
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 768
      setIsTouchDevice(!finePointer || (hasTouch && isSmallScreen))
    }
    checkPointer()
    window.addEventListener('resize', checkPointer)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      addTrailParticle(e.clientX, e.clientY)

      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement | null
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], input, select, textarea, [data-interactive="true"], [data-cursor="pointer"], .btn-primary, .btn-secondary, label'
          )
        )
        const isText = Boolean(
          target.closest('input[type="text"], textarea, [contenteditable="true"]')
        )
        setCursorState(isText ? 'text' : isInteractive ? 'hover' : 'default')
      }
    }

    const handleMouseDown = () => setCursorState('click')
    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('a, button, [role="button"]')) {
        setCursorState('hover')
      } else {
        setCursorState('default')
      }
    }
    const handleMouseLeave = () => { setIsVisible(false); setCursorState('default') }
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('resize', checkPointer)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isVisible, mouseX, mouseY, addTrailParticle])

  if (isTouchDevice) return null

  const isHover = cursorState === 'hover'
  const isClick = cursorState === 'click'

  // Ring sizes for different states
  const ringSize = isHover ? 56 : isClick ? 24 : 36
  const dotSize = isHover ? 10 : isClick ? 4 : 6

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Trailing particle canvas */}
      <canvas
        ref={trailCanvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Outer cinematic trailing ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          borderRadius: '50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isVisible ? 1 : 0,
          scale: isClick ? 0.75 : isHover ? 1.15 : 1,
          borderColor: isHover ? '#FF6B00' : 'rgba(255, 107, 0, 0.4)',
          backgroundColor: isHover ? 'rgba(255, 107, 0, 0.08)' : 'rgba(255, 107, 0, 0.02)',
          boxShadow: isHover
            ? '0 0 28px rgba(255, 107, 0, 0.5), inset 0 0 14px rgba(255, 107, 0, 0.2)'
            : '0 0 12px rgba(255, 107, 0, 0.12)',
          borderWidth: isHover ? '2px' : '1.5px',
          borderStyle: 'solid',
        }}
        transition={{
          width: { type: 'spring', stiffness: 400, damping: 28 },
          height: { type: 'spring', stiffness: 400, damping: 28 },
          scale: { type: 'spring', stiffness: 500, damping: 22 },
          opacity: { duration: 0.2 },
          borderColor: { duration: 0.12 },
          backgroundColor: { duration: 0.12 },
        }}
      />

      {/* Inner glowing precision dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          borderRadius: '50%',
          backgroundColor: '#FF6B00',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: isVisible ? 1 : 0,
          scale: isClick ? 0.5 : 1,
          boxShadow: isHover
            ? '0 0 16px #FF6B00, 0 0 6px #FFAA66, 0 0 30px rgba(255,107,0,0.3)'
            : '0 0 10px #FF6B00, 0 0 3px #FFAA66',
        }}
        transition={{
          width: { duration: 0.12 },
          height: { duration: 0.12 },
          scale: { duration: 0.08 },
          opacity: { duration: 0.12 },
        }}
      />
    </div>
  )
}

export default CustomCursor
