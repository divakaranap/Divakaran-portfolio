import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Award,
  Zap,
  Flame,
  Target,
  Code,
  BadgeCheck,
  Trophy,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { achievements } from '../../data/portfolio'

// Map icon string from portfolio.ts to Lucide icon component
const getAchievementIcon = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'award':
      return Award
    case 'badge-check':
      return BadgeCheck
    case 'zap':
      return Zap
    case 'flame':
      return Flame
    case 'target':
      return Target
    case 'code':
      return Code
    default:
      return Award
  }
}

// Extra tag & accent for high-fidelity Netflix aesthetic
const ACHIEVEMENT_METAS: Record<
  number,
  { category: string; accentColor: string; bgGradient: string; tag: string }
> = {
  0: {
    category: 'Ambassadorship',
    accentColor: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
    tag: '#1 MOST POPULAR',
  },
  1: {
    category: 'Student Leadership',
    accentColor: '#00D4FF',
    bgGradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(0, 212, 255, 0.05))',
    tag: '#2 NATIONAL PROGRAM',
  },
  2: {
    category: 'Hackathon Finalist',
    accentColor: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(139, 92, 246, 0.05))',
    tag: '#3 TOP PERFORMER',
  },
  3: {
    category: 'National Finalist',
    accentColor: '#EF4444',
    bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
    tag: '#4 HIGH IMPACT',
  },
  4: {
    category: 'Engineering Hackathon',
    accentColor: '#06B6D4',
    bgGradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(6, 182, 212, 0.05))',
    tag: '#5 INNOVATION PICK',
  },
  5: {
    category: 'Open Source Fellow',
    accentColor: '#10B981',
    bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))',
    tag: '#6 AGENTIC AI & OSS',
  },
}

const AchievementsSection: React.FC = () => {
  const [columns, setColumns] = useState<number>(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1)
      } else if (window.innerWidth < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <section
      id="achievements"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        backgroundColor: 'var(--color-bg-primary)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header with Netflix Top 10 inspiration */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          {/* Season Badge */}
          <div className="season-badge">
            <span style={{ color: 'var(--color-amber)', fontWeight: 700 }}>
              SEASON 05
            </span>
            <span>•</span>
            <span>ACHIEVEMENTS</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              {/* Netflix Top Picks Banner */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(245, 158, 11, 0.08))',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#F59E0B',
                    color: '#000000',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '0.75rem',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '3px',
                    letterSpacing: '0.05em',
                  }}
                >
                  TOP {achievements.length}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#FDE68A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <TrendingUp size={13} color="#F59E0B" />
                  TOP PICKS IN HONORS & HACKATHONS
                </span>
              </div>

              <h2 className="section-title" style={{ margin: 0 }}>
                CRITICALLY ACCLAIMED <span className="accent" style={{ background: 'linear-gradient(135deg, #F59E0B, #FBBF24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>MILESTONES</span>
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '1.05rem',
                  color: 'var(--color-text-secondary)',
                  maxWidth: '650px',
                  marginTop: '0.75rem',
                  lineHeight: 1.6,
                }}
              >
                Distinguished recognitions, ambassadorship selections, and hackathon finalists
                ranked among the most impactful highlights of my engineering journey.
              </p>
            </div>

            {/* Hall of Fame badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Trophy size={20} color="#F59E0B" />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#FDE68A',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Hall of Honors
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  100% Verified Track Record
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '1.75rem',
          }}
        >
          {achievements.map((item, index) => {
            const Icon = getAchievementIcon(item.icon)
            const meta = ACHIEVEMENT_METAS[index] || {
              category: 'Achievement',
              accentColor: '#F59E0B',
              bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
              tag: `#${index + 1} RANKED`,
            }
            const rankFormatted = String(index + 1).padStart(2, '0')

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                style={{
                  position: 'relative',
                  background: 'rgba(18, 18, 28, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '2rem 1.75rem',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#F59E0B'
                  e.currentTarget.style.boxShadow =
                    '0 14px 40px rgba(245, 158, 11, 0.22), inset 0 0 25px rgba(245, 158, 11, 0.05)'
                  e.currentTarget.style.background = 'rgba(22, 22, 34, 0.85)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(18, 18, 28, 0.7)'
                }}
              >
                {/* Netflix Top 10 Massive Watermark Numeral */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.25rem',
                    right: '1rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '6.5rem',
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-0.06em',
                    color: 'rgba(255, 255, 255, 0.035)',
                    pointerEvents: 'none',
                    userSelect: 'none',
                    zIndex: 0,
                  }}
                >
                  {index + 1}
                </div>

                {/* Top Shimmer Accent Line on Hover */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, transparent, ${meta.accentColor}, transparent)`,
                    opacity: 0.8,
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Card Header: Rank Badge & Category */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {/* Top 10 Styled Rank Pill */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '6px',
                        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))',
                        border: '1px solid rgba(245, 158, 11, 0.35)',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: '0.78rem',
                          color: '#F59E0B',
                        }}
                      >
                        TOP
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          color: '#FFFFFF',
                        }}
                      >
                        #{rankFormatted}
                      </span>
                    </div>

                    {/* Category Label */}
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {meta.category}
                    </span>
                  </div>

                  {/* Icon and Title */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '12px',
                        background: meta.bgGradient,
                        border: `1px solid ${meta.accentColor}50`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 16px ${meta.accentColor}30`,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Icon size={22} color={meta.accentColor} />
                    </div>

                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          lineHeight: 1.3,
                          color: '#FFFFFF',
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          color: meta.accentColor,
                          margin: '0.35rem 0 0 0',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Tag */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    marginTop: '1.5rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <Sparkles size={12} color="#F59E0B" />
                    {meta.tag}
                  </span>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: 'var(--color-blue)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    FEATURED
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default AchievementsSection
