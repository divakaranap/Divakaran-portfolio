import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Terminal,
  Cpu,
  Cloud,
  Brain,
  Sparkles,
  Code2,
  Workflow,
  ArrowUpRight,
} from 'lucide-react'

// ============================================================================
// SKILLS DATA & CATEGORIES
// ============================================================================

interface SkillCategory {
  id: string
  name: string
  code: string
  color: string
  glowColor: string
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>
  skills: string[]
}

const CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming',
    code: '01 // PROGRAMMING',
    color: '#FF6B00', // Orange
    glowColor: 'rgba(255, 107, 0, 0.45)',
    icon: Terminal,
    skills: ['Python', 'Java', 'C'],
  },
  {
    id: 'ml-ai-frameworks',
    name: 'ML/AI Frameworks',
    code: '02 // ML/AI FRAMEWORKS',
    color: '#3B9EFF', // Blue
    glowColor: 'rgba(59, 158, 255, 0.45)',
    icon: Cpu,
    skills: ['TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas'],
  },
  {
    id: 'cloud-tools',
    name: 'Cloud/Tools',
    code: '03 // CLOUD & TOOLS',
    color: '#2DD4A0', // Green
    glowColor: 'rgba(45, 212, 160, 0.45)',
    icon: Cloud,
    skills: ['AWS', 'Google Cloud', 'Streamlit', 'MATLAB', 'GitHub'],
  },
  {
    id: 'ai-specializations',
    name: 'AI Specializations',
    code: '04 // AI SPECIALIZATIONS',
    color: '#9B6DFF', // Purple
    glowColor: 'rgba(155, 109, 255, 0.45)',
    icon: Brain,
    skills: [
      'Agentic AI',
      'LLMs',
      'RAG',
      'Generative AI',
      'NLP',
      'Computer Vision',
    ],
  },
  {
    id: 'practices',
    name: 'Practices',
    code: '05 // PRACTICES',
    color: '#FF4F9A', // Pink
    glowColor: 'rgba(255, 79, 154, 0.45)',
    icon: Workflow,
    skills: [
      'MLOps',
      'Data Preprocessing',
      'Model Deployment',
      'REST APIs',
    ],
  },
]

// ============================================================================
// BOTTOM STAT CARDS DATA
// ============================================================================

interface StatCardData {
  number: string
  label: string
  highlight: string
  category: string
  color: string
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>
}

const STAT_CARDS: StatCardData[] = [
  {
    number: '3',
    label: 'Programming Languages',
    highlight: 'Python • Java • C',
    category: 'CORE LANGUAGES',
    color: '#FF6B00',
    icon: Code2,
  },
  {
    number: '7+',
    label: 'ML Libraries',
    highlight: 'TensorFlow • Scikit • NumPy • Pandas',
    category: 'MACHINE LEARNING',
    color: '#3B9EFF',
    icon: Cpu,
  },
  {
    number: '5+',
    label: 'Cloud Tools',
    highlight: 'AWS • GCP • Streamlit • GitHub',
    category: 'INFRASTRUCTURE',
    color: '#2DD4A0',
    icon: Cloud,
  },
  {
    number: '12+',
    label: 'AI Projects',
    highlight: 'Agentic AI • RAG • Computer Vision',
    category: 'SOLUTIONS SHIPPED',
    color: '#E63020',
    icon: Sparkles,
  },
]

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export const SkillsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="skills"
      style={{
        position: 'relative',
        backgroundColor: '#0f0f0f',
        color: '#FFFFFF',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 3rem)',
        overflow: 'hidden',
      }}
    >
      {/* ── Background Subtle Grid Overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          backgroundPosition: 'center center',
          maskImage:
            'radial-gradient(ellipse 85% 65% at 50% 40%, #000 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 85% 65% at 50% 40%, #000 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Cinematic Ambient Glow Gradients ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '550px',
          height: '550px',
          background:
            'radial-gradient(circle, rgba(255, 107, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(155, 109, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Inner Content Container ── */}
      <div
        style={{
          maxWidth: 'var(--container-max, 1340px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Section Header ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {/* Section Label */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-orange, #FF6B00)',
              marginBottom: '1rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '32px',
                height: '2px',
                backgroundColor: 'var(--color-orange, #FF6B00)',
                boxShadow: '0 0 10px rgba(255, 107, 0, 0.6)',
              }}
            />
            <span>TECHNICAL ARSENAL</span>
          </div>

          {/* Section Headline & Description */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily:
                    'var(--font-headline, "Barlow Condensed", sans-serif)',
                  fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                SKILLS &{' '}
                <span
                  style={{
                    background:
                      'var(--gradient-fire, linear-gradient(135deg, #FF6B00 0%, #E63020 100%))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  TECHNOLOGIES
                </span>
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body, "Inter", sans-serif)',
                  fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                  color: 'var(--color-text-secondary, rgba(255, 255, 255, 0.65))',
                  maxWidth: '680px',
                  marginTop: '0.85rem',
                  lineHeight: 1.6,
                }}
              >
                High-performance toolchains and architectures honed for autonomous
                intelligence, enterprise machine learning pipelines, and cloud-scale
                deployments.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.55rem 1.15rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#FF6B00',
                  boxShadow: '0 0 10px #FF6B00',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: '#FFFFFF',
                }}
              >
                22 SKILLS ACROSS 5 DISCIPLINES
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Categories with Colored Separators & Freeform Floating Tags ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
          {CATEGORIES.map((category, catIndex) => {
            const CategoryIcon = category.icon

            return (
              <motion.div
                key={category.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  delay: catIndex * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ position: 'relative' }}
              >
                {/* ── Colored Category Separator ── */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Category Indicator Pip & Title */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '6px',
                        background: `${category.color}15`,
                        border: `1px solid ${category.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 0 12px ${category.color}25`,
                      }}
                    >
                      <CategoryIcon size={14} color={category.color} />
                    </div>

                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: category.color,
                      }}
                    >
                      {category.code}
                    </span>

                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                        background: `${category.color}14`,
                        color: category.color,
                        border: `1px solid ${category.color}30`,
                      }}
                    >
                      {category.skills.length} SKILLS
                    </span>
                  </div>

                  {/* Gradient Rule Separator */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: '120px',
                      height: '1px',
                      background: `linear-gradient(90deg, ${category.color}60 0%, ${category.color}20 60%, transparent 100%)`,
                    }}
                  />
                </div>

                {/* ── Freeform / Masonry Floating Colored Tags / Bubbles ── */}
                <motion.div
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: shouldReduceMotion ? 0 : 0.07,
                        delayChildren: shouldReduceMotion ? 0 : 0.05,
                      },
                    },
                  }}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.85rem 1rem',
                    paddingLeft: '0.25rem',
                  }}
                >
                  {category.skills.map((skill, tagIndex) => {
                    // Slight staggered floating duration & delay for organic levitation
                    const floatDuration = 3.2 + ((tagIndex * 0.7) % 2)
                    const floatDelay = (tagIndex * 0.25) % 1.5

                    return (
                      <motion.div
                        key={skill}
                        variants={{
                          hidden: {
                            opacity: 0,
                            y: 18,
                            scale: 0.9,
                          },
                          visible: {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                            },
                          },
                        }}
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: [0, -4, 0],
                                transition: {
                                  duration: floatDuration,
                                  repeat: Infinity,
                                  repeatType: 'reverse',
                                  ease: 'easeInOut',
                                  delay: floatDelay,
                                },
                              }
                        }
                        whileHover={
                          shouldReduceMotion
                            ? {}
                            : {
                                scale: 1.08,
                                y: -5,
                                transition: {
                                  type: 'spring',
                                  stiffness: 450,
                                  damping: 22,
                                },
                              }
                        }
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          padding: '0.68rem 1.35rem',
                          borderRadius: '9999px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                          border: `1px solid ${category.color}35`,
                          color: '#FFFFFF',
                          fontFamily:
                            'var(--font-mono, "JetBrains Mono", monospace)',
                          fontSize: 'clamp(0.85rem, 1.1vw, 0.925rem)',
                          fontWeight: 500,
                          letterSpacing: '0.025em',
                          cursor: 'default',
                          userSelect: 'none',
                          boxShadow: `0 4px 18px rgba(0, 0, 0, 0.35), inset 0 0 14px ${category.color}0a`,
                          transition:
                            'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = category.color
                          e.currentTarget.style.backgroundColor = `${category.color}1c`
                          e.currentTarget.style.boxShadow = `0 0 26px ${category.glowColor}, 0 8px 24px rgba(0, 0, 0, 0.5)`
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = `${category.color}35`
                          e.currentTarget.style.backgroundColor =
                            'rgba(255, 255, 255, 0.03)'
                          e.currentTarget.style.boxShadow = `0 4px 18px rgba(0, 0, 0, 0.35), inset 0 0 14px ${category.color}0a`
                        }}
                      >
                        {/* Dot Indicator */}
                        <span
                          style={{
                            width: '7.5px',
                            height: '7.5px',
                            borderRadius: '50%',
                            backgroundColor: category.color,
                            boxShadow: `0 0 9px ${category.color}, 0 0 3px ${category.color}`,
                            flexShrink: 0,
                            display: 'inline-block',
                          }}
                        />

                        {/* Skill Name */}
                        <span style={{ whiteSpace: 'nowrap' }}>{skill}</span>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom Row: 4 Stat Cards ── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 'clamp(4rem, 7vw, 5.5rem)',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Subtle Row Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.75rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted, rgba(255, 255, 255, 0.35))',
              }}
            >
              // PRODUCTION METRICS & CAPABILITIES SUMMARY
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                fontSize: '0.72rem',
                color: 'var(--color-orange, #FF6B00)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <span>CONTINUOUSLY EXPANDING</span>
              <ArrowUpRight size={14} />
            </div>
          </div>

          {/* 4 Responsive Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(clamp(220px, 22vw, 280px), 1fr))',
              gap: '1.25rem',
            }}
          >
            {STAT_CARDS.map((stat) => {
              const IconComp = stat.icon

              return (
                <motion.div
                  key={stat.label}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -6,
                          scale: 1.015,
                          transition: { duration: 0.2 },
                        }
                  }
                  style={{
                    position: 'relative',
                    background:
                      'linear-gradient(145deg, rgba(22, 22, 28, 0.7) 0%, rgba(14, 14, 18, 0.8) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '16px',
                    padding: '1.75rem 1.5rem',
                    overflow: 'hidden',
                    transition:
                      'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${stat.color}60`
                    e.currentTarget.style.boxShadow = `0 14px 36px rgba(0, 0, 0, 0.6), 0 0 24px ${stat.color}25`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      'rgba(255, 255, 255, 0.07)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Top Glowing Accent Line */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '12%',
                      right: '12%',
                      height: '2px',
                      background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    }}
                  />

                  {/* Corner Glow Overlay */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '120px',
                      height: '120px',
                      background: `radial-gradient(circle at top right, ${stat.color}15 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Card Header: Icon & Category */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily:
                          'var(--font-mono, "JetBrains Mono", monospace)',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        color: 'var(--color-text-muted, rgba(255, 255, 255, 0.4))',
                        textTransform: 'uppercase',
                      }}
                    >
                      {stat.category}
                    </span>

                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${stat.color}14`,
                        border: `1px solid ${stat.color}35`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <IconComp size={16} color={stat.color} />
                    </div>
                  </div>

                  {/* Stat Big Number */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-headline, "Barlow Condensed", sans-serif)',
                      fontSize: 'clamp(3rem, 5vw, 4.25rem)',
                      fontWeight: 900,
                      lineHeight: 0.9,
                      letterSpacing: '-0.01em',
                      color: stat.color,
                      marginBottom: '0.45rem',
                      textShadow: `0 0 24px ${stat.color}35`,
                    }}
                  >
                    {stat.number}
                  </div>

                  {/* Stat Label */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display, "Outfit", sans-serif)',
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      letterSpacing: '0.01em',
                      color: '#FFFFFF',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {stat.label}
                  </div>

                  {/* Subtitle / Highlight */}
                  <div
                    style={{
                      fontFamily:
                        'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: '0.72rem',
                      color:
                        'var(--color-text-secondary, rgba(255, 255, 255, 0.55))',
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.highlight}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
