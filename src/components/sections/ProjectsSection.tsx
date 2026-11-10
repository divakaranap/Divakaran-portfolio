import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

// Inline GitHub SVG (brand icons removed from lucide-react v1.x)
const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)
import { projects } from '../../data/portfolio'

// Project color accent mapping
const projectVisuals: Record<string, { gradient: string; pattern: string }> = {
  'insider-threat': {
    gradient: 'linear-gradient(135deg, #00D4FF22, #0A162888)',
    pattern: '⬡',
  },
  'lexi-rag': {
    gradient: 'linear-gradient(135deg, #9B6DFF22, #1A0A2E88)',
    pattern: '⬢',
  },
  'ai-traffic': {
    gradient: 'linear-gradient(135deg, #2DD4A022, #0A1A2E88)',
    pattern: '◈',
  },
  'undo-ai': {
    gradient: 'linear-gradient(135deg, #FF6B0022, #1A140088)',
    pattern: '⟳',
  },
  'omnivoice': {
    gradient: 'linear-gradient(135deg, #FF4F9A22, #2A0A1E88)',
    pattern: '◎',
  },
  'fifa-predictor': {
    gradient: 'linear-gradient(135deg, #2DD4A022, #0A1E1488)',
    pattern: '◆',
  },
  'traceid-ai': {
    gradient: 'linear-gradient(135deg, #EF444422, #1E0A0A88)',
    pattern: '⬟',
  },
  'skillloop-ai': {
    gradient: 'linear-gradient(135deg, #3B9EFF22, #0A142888)',
    pattern: '◉',
  },
  'volunteer-iq': {
    gradient: 'linear-gradient(135deg, #A855F722, #1A0A2888)',
    pattern: '◈',
  },
  'helmet-detection': {
    gradient: 'linear-gradient(135deg, #F9731622, #1E140088)',
    pattern: '⬡',
  },
  'car-price': {
    gradient: 'linear-gradient(135deg, #14B8A622, #0A1E1A88)',
    pattern: '◇',
  },
  'mall-segmentation': {
    gradient: 'linear-gradient(135deg, #6366F122, #0A0A2888)',
    pattern: '◉',
  },
}

const featured = projects.slice(0, 6)
const rest = projects.slice(6)

const ProjectCard: React.FC<{ project: typeof projects[0]; large?: boolean; index: number }> = ({ project, large, index }) => {
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const visual = projectVisuals[project.id] || { gradient: `linear-gradient(135deg, ${project.color}22, #08080888)`, pattern: '◆' }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: hovered
          ? `${visual.gradient.replace(/22/g, '33').replace(/88/g, 'BB')}`
          : visual.gradient,
        border: `1px solid ${hovered ? project.color + '50' : 'rgba(255,255,255,0.07)'}`,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        minHeight: large ? '360px' : '280px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? `0 16px 48px ${project.color}22` : 'none',
        transform: hovered && !shouldReduceMotion ? 'translateY(-6px)' : 'none',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: large ? '12rem' : '8rem', color: project.color, opacity: hovered ? 0.08 : 0.04,
        fontWeight: 900, pointerEvents: 'none', transition: 'opacity 0.4s ease',
        userSelect: 'none',
      }}>
        {visual.pattern}
      </div>

      {/* Top bar */}
      <div style={{ padding: '1.5rem 1.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'inline-flex', padding: '0.3rem 0.7rem', borderRadius: '999px',
          background: `${project.color}18`, border: `1px solid ${project.color}40`,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: project.color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {project.category}
          </span>
        </div>
        <motion.div
          animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          style={{ color: hovered ? project.color : 'var(--color-text-muted)' }}
        >
          <ArrowUpRight size={18} />
        </motion.div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', zIndex: 2 }}>
        <h3 style={{
          fontFamily: 'var(--font-headline)', fontWeight: 900,
          fontSize: large ? 'clamp(1.4rem, 3vw, 2rem)' : 'clamp(1.1rem, 2vw, 1.5rem)',
          lineHeight: 1.1, letterSpacing: '0.02em', textTransform: 'uppercase',
          color: '#fff', marginBottom: '0.6rem',
        }}>{project.shortTitle}</h3>

        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: hovered ? 1 : 0, height: hovered ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6,
            color: 'var(--color-text-secondary)', marginBottom: '1rem', overflow: 'hidden',
          }}
        >{project.description}</motion.p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {project.technologies.map(tech => (
            <span key={tech} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.08em',
              padding: '0.2rem 0.5rem', borderRadius: '4px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--color-text-muted)', textTransform: 'uppercase',
            }}>{tech}</span>
          ))}
        </div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ display: 'flex', gap: '0.75rem' }}
        >
          {project.github && (
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = project.color; e.currentTarget.style.color = project.color }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
            >
              <GithubIcon size={12} /> GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)',
                background: `${project.color}22`, border: `1px solid ${project.color}50`,
                color: project.color, fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                letterSpacing: '0.1em', textDecoration: 'none', textTransform: 'uppercase',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.color}40` }}
              onMouseLeave={e => { e.currentTarget.style.background = `${project.color}22` }}
            >
              <ExternalLink size={12} /> LIVE
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export const ProjectsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="projects"
      style={{
        position: 'relative',
        background: 'var(--color-bg-secondary)',
        overflow: 'hidden',
        padding: 'var(--section-padding)',
      }}
    >
      {/* Background big text */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        fontFamily: 'var(--font-headline)', fontWeight: 900,
        fontSize: 'clamp(8rem, 25vw, 22rem)', letterSpacing: '-0.02em',
        color: 'rgba(255,107,0,0.03)', whiteSpace: 'nowrap',
        pointerEvents: 'none', userSelect: 'none', zIndex: 0, lineHeight: 1,
      }}>WORK</div>

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div className="section-label">PROJECT ORIGINALS</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 className="section-title">
              SELECTED{' '}<span className="accent">WORK</span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              color: 'var(--color-text-secondary)', maxWidth: '400px', lineHeight: 1.7,
            }}>
              {projects.length} AI/ML projects spanning cybersecurity, agentic systems, computer vision and intelligent applications.
            </p>
          </div>
        </motion.div>

        {/* Featured grid: 1 large + 2 medium top, then 3 medium bottom */}
        <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '1.2rem' }}>
          {/* Row 1: big card + 2 medium */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.2rem',
          }}>
            {featured.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} large={i === 0} index={i} />
            ))}
          </div>
          {/* Row 2 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.2rem',
          }}>
            {featured.slice(3).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 3} />
            ))}
          </div>
        </div>

        {/* Remaining projects: compact list */}
        {rest.length > 0 && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ marginTop: '3rem' }}
          >
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                letterSpacing: '0.18em', color: 'var(--color-text-muted)', textTransform: 'uppercase',
              }}>MORE PROJECTS</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
              {rest.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  whileHover={shouldReduceMotion ? {} : { borderColor: `${p.color}40`, background: `${p.color}08` }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9rem', color: '#fff', marginBottom: '0.2rem' }}>{p.shortTitle}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{p.category}</div>
                  </div>
                  {p.github && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{ color: p.color, textDecoration: 'none', flexShrink: 0 }}
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
