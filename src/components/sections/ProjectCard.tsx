import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ExternalLink,
  Play,
  Info,
  Shield,
  Scale,
  TrafficCone,
  Undo,
  Mic,
  Trophy,
  Fingerprint,
  MapPin,
  Users,
  Wrench,
  Car,
  PieChart,
  Sparkles,
} from 'lucide-react'

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
import type { Project } from '../../data/portfolio'

export interface ProjectCardProps {
  project: Project
  index?: number
  onSelect?: (project: Project) => void
  onClick?: () => void
}

const renderProjectIcon = (icon: string, size = 18) => {
  switch (icon) {
    case 'shield':
      return <Shield size={size} />
    case 'scale':
      return <Scale size={size} />
    case 'traffic-cone':
      return <TrafficCone size={size} />
    case 'undo':
      return <Undo size={size} />
    case 'mic':
      return <Mic size={size} />
    case 'trophy':
      return <Trophy size={size} />
    case 'fingerprint':
      return <Fingerprint size={size} />
    case 'map-pin':
      return <MapPin size={size} />
    case 'users':
      return <Users size={size} />
    case 'hard-hat':
      return <Wrench size={size} />
    case 'car':
      return <Car size={size} />
    case 'pie-chart':
      return <PieChart size={size} />
    default:
      return <Sparkles size={size} />
  }
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index = 0,
  onSelect,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(project)
    }
    if (onClick) {
      onClick()
    }
  }

  const num = String(index + 1).padStart(2, '0')
  const accentColor = project.color || 'var(--color-blue)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: shouldReduceMotion ? 0.01 : 0.4,
        delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3),
      }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.03,
              y: -6,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
      }
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`View episode details for ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
      style={{
        position: 'relative',
        height: '100%',
        minHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)',
        background: isHovered
          ? `linear-gradient(155deg, rgba(22, 22, 36, 0.92) 0%, rgba(12, 12, 20, 0.96) 100%)`
          : `linear-gradient(155deg, rgba(16, 16, 26, 0.85) 0%, rgba(10, 10, 16, 0.94) 100%)`,
        border: `1px solid ${
          isHovered ? `${accentColor}77` : 'rgba(255, 255, 255, 0.08)'
        }`,
        boxShadow: isHovered
          ? `0 18px 45px rgba(0, 0, 0, 0.7), 0 0 30px ${accentColor}33`
          : '0 8px 24px rgba(0, 0, 0, 0.45)',
        cursor: 'pointer',
        overflow: 'hidden',
        outline: 'none',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Top Accent Gradient Line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          opacity: isHovered ? 1 : 0.6,
          transition: 'opacity 0.3s ease',
          zIndex: 3,
        }}
      />

      {/* Subtle Ambient Radial Highlight inside card */}
      <div
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}25 0%, transparent 70%)`,
          pointerEvents: 'none',
          transition: 'opacity 0.4s ease',
          opacity: isHovered ? 1 : 0.35,
          zIndex: 1,
        }}
      />

      {/* Top Banner: Episode Number, Category Badge & Icon */}
      <div
        style={{
          position: 'relative',
          padding: '1.25rem 1.25rem 0.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem',
          zIndex: 2,
        }}
      >
        {/* Episode Number + Category Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: accentColor,
              padding: '0.2rem 0.45rem',
              borderRadius: '4px',
              background: `${accentColor}18`,
              border: `1px solid ${accentColor}35`,
              letterSpacing: '0.05em',
            }}
          >
            EP {num}
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: 'var(--color-text-secondary)',
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Floating Category Icon Button */}
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: accentColor,
            flexShrink: 0,
            boxShadow: isHovered ? `0 0 16px ${accentColor}55` : 'none',
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
          }}
        >
          {renderProjectIcon(project.icon, 18)}
        </div>
      </div>

      {/* Middle Content: Title, Moniker & Clamped Description */}
      <div
        style={{
          position: 'relative',
          padding: '0.75rem 1.25rem',
          zIndex: 2,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        {/* Short Title / Identifier */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.35rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: accentColor,
              boxShadow: `0 0 8px ${accentColor}`,
            }}
          />
          {project.shortTitle}
        </div>

        {/* Project Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-primary)',
            marginBottom: '0.75rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.title}
        </h3>

        {/* Short Description (2-3 lines clamp) */}
        <p
          style={{
            fontSize: '0.875rem',
            lineHeight: 1.6,
            color: 'var(--color-text-secondary)',
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Technology Pills Section */}
      <div
        style={{
          position: 'relative',
          padding: '0.5rem 1.25rem 0.75rem 1.25rem',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
          }}
        >
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              style={{
                padding: '0.22rem 0.55rem',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.02em',
              }}
            >
              {tech}
            </span>
          ))}

          {project.technologies.length > 3 && (
            <span
              style={{
                padding: '0.22rem 0.5rem',
                borderRadius: '4px',
                background: `${accentColor}12`,
                border: `1px solid ${accentColor}25`,
                color: accentColor,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                fontWeight: 600,
              }}
            >
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Footer Actions (GitHub, Live Demo, View Details) */}
      <div
        style={{
          position: 'relative',
          padding: '0.85rem 1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              title="View Repository"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accentColor}25`
                e.currentTarget.style.borderColor = accentColor
                e.currentTarget.style.color = accentColor
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              <GithubIcon size={15} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live Demo for ${project.title}`}
              title="Launch Live Demo"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: `${accentColor}18`,
                border: `1px solid ${accentColor}44`,
                color: accentColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = accentColor
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${accentColor}18`
                e.currentTarget.style.color = accentColor
              }}
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* View Details Prompt Pill */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: isHovered ? accentColor : 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'color var(--transition-fast)',
          }}
        >
          DETAILS →
        </span>
      </div>

      {/* Netflix-Style Hover Overlay: 'PLAY PREVIEW' / 'MORE INFO' */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8, 8, 14, 0.6) 0%, rgba(10, 10, 18, 0.94) 45%, rgba(5, 5, 10, 0.98) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '1.5rem',
          zIndex: 5,
          pointerEvents: isHovered ? 'auto' : 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: accentColor,
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '0.35rem',
          }}
        >
          STREAMING ORIGINAL
        </span>

        {project.demo && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.open(project.demo, '_blank', 'noopener,noreferrer')
            }}
            style={{
              width: '100%',
              maxWidth: '220px',
              padding: '0.65rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: `linear-gradient(135deg, ${accentColor}, #0066FF)`,
              color: '#000',
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: `0 4px 18px ${accentColor}55`,
              transition: 'transform var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Play size={14} fill="currentColor" />
            PLAY PREVIEW
          </button>
        )}

        <button
          type="button"
          onClick={handleCardClick}
          style={{
            width: '100%',
            maxWidth: '220px',
            padding: '0.65rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backdropFilter: 'blur(8px)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            e.currentTarget.style.borderColor = accentColor
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
          }}
        >
          <Info size={14} />
          MORE INFO
        </button>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
