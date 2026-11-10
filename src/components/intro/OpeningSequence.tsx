import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, SkipForward, Play, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

export interface OpeningSequenceProps {
  onComplete: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

interface SynapsePulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
  color: string;
}

export const OpeningSequence: React.FC<OpeningSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'glow' | 'particles' | 'typing' | 'subtitle' | 'logo' | 'ready'>('glow');
  const [typedName, setTypedName] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const hasCompletedRef = useRef(false);

  const fullName = personalInfo.name; // "DIVAKARAN A P"
  const subtitleText = personalInfo.subtitle; // "AI/ML ENGINEER | AGENTIC AI DEVELOPER"

  // Safe trigger for onComplete (ensures called only once)
  const triggerComplete = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  }, [onComplete]);

  // Handle Skip Intro
  const handleSkip = useCallback(() => {
    triggerComplete();
  }, [triggerComplete]);

  // Handle Enter Experience
  const handleEnter = useCallback(() => {
    triggerComplete();
  }, [triggerComplete]);

  // Keyboard accessibility: Escape to skip, Enter or Space to enter when ready
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSkip, handleEnter]);

  // Sequence Timeline Controller
  useEffect(() => {
    // Phase progression timer
    const t1 = setTimeout(() => setPhase('particles'), 400);
    const t2 = setTimeout(() => setPhase('typing'), 1000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Typewriter effect for fullName
  useEffect(() => {
    if (phase !== 'typing') return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex += 1;
      setTypedName(fullName.slice(0, currentIndex));
      if (currentIndex >= fullName.length) {
        clearInterval(interval);
        setTimeout(() => setPhase('subtitle'), 350);
        setTimeout(() => setPhase('logo'), 1100);
        setTimeout(() => setPhase('ready'), 1800);
      }
    }, 85);

    return () => clearInterval(interval);
  }, [phase, fullName]);

  // Neural Network Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 18000), 32), 75);
    const colors = ['#00D4FF', '#8B5CF6', '#06B6D4', '#C084FC'];

    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }));

    // Dynamic synaptic pulses traveling between nodes
    const pulses: SynapsePulse[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Maximum distance to draw connections
    const maxDistance = width < 768 ? 95 : 135;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn a synaptic pulse
      if (pulses.length < 6 && Math.random() < 0.04) {
        const i1 = Math.floor(Math.random() * particles.length);
        const p1 = particles[i1];
        // Find a nearby node
        for (let i2 = 0; i2 < particles.length; i2++) {
          if (i1 === i2) continue;
          const p2 = particles[i2];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < maxDistance) {
            pulses.push({
              fromIndex: i1,
              toIndex: i2,
              progress: 0,
              speed: 0.015 + Math.random() * 0.02,
              color: p1.color,
            });
            break;
          }
        }
      }

      // Update and draw connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap edges smoothly
        if (p1.x < -20) p1.x = width + 20;
        if (p1.x > width + 20) p1.x = -20;
        if (p1.y < -20) p1.y = height + 20;
        if (p1.y > height + 20) p1.y = -20;

        // Mouse interaction (gentle repulsion/attraction)
        if (mouseRef.current.active) {
          const dx = p1.x - mouseRef.current.x;
          const dy = p1.y - mouseRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 0) {
            const force = (1 - dist / 140) * 0.8;
            p1.x += (dx / dist) * force;
            p1.y += (dy / dist) * force;
          }
        }

        // Draw connections to neighboring particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        ctx.shadowColor = p1.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for performance
      }

      // Draw and update synaptic pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const p1 = particles[pulse.fromIndex];
        const p2 = particles[pulse.toIndex];

        if (!p1 || !p2) {
          pulses.splice(p, 1);
          continue;
        }

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const currX = p1.x + (p2.x - p1.x) * pulse.progress;
        const currY = p1.y + (p2.y - p1.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.06, filter: 'blur(10px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0a0a0f',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        userSelect: 'none',
      }}
    >
      {/* Animated CSS Nebula Gradients */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        {/* Nebula Glow 1: Electric Blue Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            width: '65vw',
            height: '65vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.12) 0%, rgba(0, 212, 255, 0) 70%)',
            filter: 'blur(60px)',
            animation: 'pulse-glow 8s ease-in-out infinite alternate',
          }}
        />

        {/* Nebula Glow 2: Violet Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            right: '-15%',
            width: '70vw',
            height: '70vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0) 70%)',
            filter: 'blur(80px)',
            animation: 'pulse-glow 10s ease-in-out infinite alternate-reverse',
          }}
        />

        {/* Center Spotlight */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50vw',
            height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(10, 10, 15, 0) 65%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(10, 10, 15, 0.85) 100%)',
          }}
        />
      </div>

      {/* Vanilla Canvas Neural Network */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: phase === 'glow' ? 0.3 : 1,
          transition: 'opacity 1.2s ease',
        }}
      />

      {/* Top Bar Header Controls */}
      <header
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.75rem 2.25rem',
          width: '100%',
        }}
      >
        {/* Left: Streaming Platform Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#00D4FF',
              boxShadow: '0 0 12px #00D4FF',
              animation: 'pulse-glow 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
            }}
          >
            ORIGINAL PRESENTATION
          </span>
        </div>

        {/* Right: Sound Toggle & Skip Intro */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* Sound Toggle (UI indicator) */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Sound muted (Visual FX active)' : 'Sound enabled'}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 0.9rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-md, 12px)',
              color: isMuted ? 'rgba(255, 255, 255, 0.5)' : '#00D4FF',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.4)';
              e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            <span style={{ display: 'none' }}>Toggle Sound</span>
            {/* Visual Equalizer Bars when unmuted */}
            {!isMuted && (
              <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: '2px', height: '12px' }}>
                <span style={{ width: '2px', height: '10px', backgroundColor: '#00D4FF', animation: 'float 0.8s infinite ease-in-out' }} />
                <span style={{ width: '2px', height: '14px', backgroundColor: '#8B5CF6', animation: 'float 0.6s infinite ease-in-out alternate' }} />
                <span style={{ width: '2px', height: '8px', backgroundColor: '#06B6D4', animation: 'float 0.9s infinite ease-in-out' }} />
              </span>
            )}
          </button>

          {/* Skip Intro Button */}
          <button
            type="button"
            onClick={handleSkip}
            aria-label="Skip Intro sequence"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 212, 255, 0.25)',
              borderRadius: 'var(--radius-md, 12px)',
              color: '#FFFFFF',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s ease',
              fontFamily: 'var(--font-display, sans-serif)',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#00D4FF';
              e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.25)';
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>SKIP INTRO</span>
            <SkipForward size={14} color="#00D4FF" />
          </button>
        </div>
      </header>

      {/* Center Cinematic Content */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Intro Category Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1.1rem',
            backgroundColor: 'rgba(0, 212, 255, 0.08)',
            border: '1px solid rgba(0, 212, 255, 0.2)',
            borderRadius: '9999px',
            marginBottom: '1.5rem',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Sparkles size={13} color="#00D4FF" />
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              color: '#00D4FF',
              textTransform: 'uppercase',
            }}
          >
            NEURAL INTELLIGENCE ARCHITECTURE
          </span>
        </motion.div>

        {/* Cinematic Title with Typewriter Effect */}
        <h1
          style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(2.5rem, 7.5vw, 5.8rem)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 1.25rem 0',
            minHeight: '1.1em',
            color: '#FFFFFF',
            textShadow: '0 0 45px rgba(0, 212, 255, 0.45), 0 0 80px rgba(139, 92, 246, 0.25)',
          }}
        >
          <span
            style={{
              background: 'linear-gradient(135deg, #FFFFFF 20%, #00D4FF 65%, #8B5CF6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {typedName}
          </span>
          {/* Glowing Blinking Cursor */}
          {phase === 'typing' || phase === 'particles' ? (
            <span
              style={{
                display: 'inline-block',
                width: '4px',
                height: '0.85em',
                verticalAlign: 'middle',
                marginLeft: '8px',
                backgroundColor: '#00D4FF',
                boxShadow: '0 0 12px #00D4FF',
                animation: 'pulse-glow 0.8s infinite',
              }}
            />
          ) : null}
        </h1>

        {/* Subtitle with letter tracking */}
        <AnimatePresence>
          {(phase === 'subtitle' || phase === 'logo' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0, y: 15, letterSpacing: '0.05em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.22em' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.85rem, 2vw, 1.2rem)',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.85)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                textShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              }}
            >
              {subtitleText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Series Branding Lockup */}
        <AnimatePresence>
          {(phase === 'logo' || phase === 'ready') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}
            >
              {/* Divider line with electric glow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  width: 'min(90vw, 480px)',
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6))',
                  }}
                />
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    transform: 'rotate(45deg)',
                    backgroundColor: '#8B5CF6',
                    boxShadow: '0 0 8px #8B5CF6',
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.6), transparent)',
                  }}
                />
              </div>

              {/* Series Title */}
              <div
                style={{
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  fontWeight: 800,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                }}
              >
                DIVAKARAN <span style={{ color: '#00D4FF' }}>—</span> THE SERIES
              </div>

              {/* Streaming Platform Metadata Badges */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  color: 'rgba(255, 255, 255, 0.55)',
                }}
              >
                <span
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    color: '#00D4FF',
                    fontWeight: 700,
                  }}
                >
                  SEASON 2026
                </span>
                <span>•</span>
                <span>7 SEASONS</span>
                <span>•</span>
                <span>12 ORIGINALS</span>
                <span>•</span>
                <span
                  style={{
                    border: '1px solid rgba(139, 92, 246, 0.4)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    color: '#C084FC',
                  }}
                >
                  AI POWERED
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 'ENTER EXPERIENCE' Button */}
        <AnimatePresence>
          {phase === 'ready' && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <button
                type="button"
                onClick={handleEnter}
                aria-label="Enter experience"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1.05rem 2.75rem',
                  background: 'linear-gradient(135deg, #00D4FF 0%, #0066FF 60%, #8B5CF6 100%)',
                  color: '#060a12',
                  border: 'none',
                  borderRadius: 'var(--radius-md, 12px)',
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontSize: '0.98rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  boxShadow: '0 0 35px rgba(0, 212, 255, 0.45), 0 10px 30px rgba(0, 0, 0, 0.6)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 0 55px rgba(0, 212, 255, 0.7), 0 15px 40px rgba(0, 0, 0, 0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 212, 255, 0.45), 0 10px 30px rgba(0, 0, 0, 0.6)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Play size={15} fill="#060a12" color="#060a12" />
                </div>
                <span>ENTER EXPERIENCE</span>
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(255, 255, 255, 0.4)',
                }}
              >
                Press <span style={{ color: '#00D4FF' }}>[ENTER]</span> or <span style={{ color: '#00D4FF' }}>[SPACE]</span> to launch
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Bottom Bar */}
      <footer
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2.25rem',
          width: '100%',
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.35)',
          letterSpacing: '0.1em',
        }}
      >
        <div>CHENNAI, INDIA • 2026</div>
        <div>PORTFOLIO PRODUCTION</div>
      </footer>
    </motion.div>
  );
};

export default OpeningSequence;
