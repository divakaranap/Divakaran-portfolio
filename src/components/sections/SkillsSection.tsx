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
  Layout,
} from 'lucide-react'

// ============================================================================
// SKILLS DATA — 7 CATEGORIES
// ============================================================================

interface SkillCategory {
  id: string
  name: string
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>
  color: string
  glowColor: string
  skills: string[]
}

const CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    name: 'Programming Languages',
    icon: Terminal,
    color: '#FF6B00',
    glowColor: 'rgba(255, 107, 0, 0.4)',
    skills: ['Python', 'Java', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: Layout,
    color: '#3B9EFF',
    glowColor: 'rgba(59, 158, 255, 0.4)',
    skills: ['HTML5', 'CSS3', 'React.js', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: Code2,
    color: '#2DD4A0',
    glowColor: 'rgba(45, 212, 160, 0.4)',
    skills: ['FastAPI', 'Flask', 'Node.js', 'REST APIs'],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    icon: Cpu,
    color: '#9B6DFF',
    glowColor: 'rgba(155, 109, 255, 0.4)',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Computer Vision',
      'TensorFlow',
      'Scikit-learn',
      'NumPy',
      'Pandas',
      'OpenCV',
    ],
  },
  {
    id: 'genai',
    name: 'Generative AI',
    icon: Sparkles,
    color: '#FF4F9A',
    glowColor: 'rgba(255, 79, 154, 0.4)',
    skills: [
      'LLM Integration',
      'Prompt Engineering',
      'RAG Fundamentals',
      'LangChain',
      'Gemini API',
      'OpenAI API',
      'Hugging Face',
    ],
  },
  {
    id: 'database-cloud',
    name: 'Database & Cloud',
    icon: Cloud,
    color: '#00D4FF',
    glowColor: 'rgba(0, 212, 255, 0.4)',
    skills: ['MySQL', 'MongoDB', 'Firebase', 'PostgreSQL', 'AWS', 'Google Cloud', 'Docker'],
  },
  {
    id: 'dev-tools',
    name: 'Developer Tools',
    icon: Workflow,
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.4)',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab', 'Postman', 'Figma'],
  },
]

// Count total skills
const TOTAL_SKILLS = CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0)

// ============================================================================
// SKILL BADGE COMPONENT
// ============================================================================

const SkillBadge: React.FC<{
  skill: string
  color: string
  glowColor: string
  index: number
  reducedMotion: boolean | null
}> = ({ skill, color, glowColor, index, reducedMotion }) => (
  <motion.span
    variants={{
      hidden: { opacity: 0, y: 14, scale: 0.92 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.35,
          delay: index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }}
    whileHover={
      reducedMotion
        ? {}
        : {
            scale: 1.06,
            y: -3,
            transition: { type: 'spring', stiffness: 400, damping: 20 },
          }
    }
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: `1px solid ${color}30`,
      color: '#FFFFFF',
      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
      fontSize: '0.82rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${color}90`
      e.currentTarget.style.background = `${color}15`
      e.currentTarget.style.boxShadow = `0 0 20px ${glowColor}, 0 4px 16px rgba(0,0,0,0.4)`
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = `${color}30`
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
      e.currentTarget.style.boxShadow = 'none'
    }}
  >
    <span
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
        flexShrink: 0,
      }}
    />
    {skill}
  </motion.span>
)

// ============================================================================
// CATEGORY CARD COMPONENT
// ============================================================================

const CategoryCard: React.FC<{
  category: SkillCategory
  index: number
  reducedMotion: boolean | null
}> = ({ category, index, reducedMotion }) => {
  const IconComp = category.icon

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reducedMotion
          ? {}
          : {
              y: -6,
              transition: { duration: 0.25 },
            }
      }
      style={{
        position: 'relative',
        background:
          'linear-gradient(145deg, rgba(22, 22, 28, 0.65) 0%, rgba(14, 14, 18, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.07)',
        borderRadius: '16px',
        padding: 'clamp(1.5rem, 2.5vw, 2rem)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${category.color}50`
        e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.5), 0 0 30px ${category.color}18`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${category.color}, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Corner ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '140px',
          height: '140px',
          background: `radial-gradient(circle at top right, ${category.color}10 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Card Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.25rem',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: `${category.color}14`,
            border: `1px solid ${category.color}35`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <IconComp size={18} color={category.color} />
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display, "Outfit", sans-serif)',
              fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              margin: 0,
              letterSpacing: '0.01em',
            }}
          >
            {category.name}
          </h3>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            fontSize: '0.68rem',
            fontWeight: 600,
            padding: '0.2rem 0.55rem',
            borderRadius: '6px',
            background: `${category.color}14`,
            color: category.color,
            border: `1px solid ${category.color}25`,
            letterSpacing: '0.08em',
          }}
        >
          {category.skills.length}
        </span>
      </div>

      {/* Skill Badges */}
      <motion.div
        initial={reducedMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-20px' }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: reducedMotion ? 0 : 0.04,
              delayChildren: reducedMotion ? 0 : 0.1,
            },
          },
        }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.6rem',
        }}
      >
        {category.skills.map((skill, i) => (
          <SkillBadge
            key={skill}
            skill={skill}
            color={category.color}
            glowColor={category.glowColor}
            index={i}
            reducedMotion={reducedMotion}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

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
      {/* Background Grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
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

      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-5%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(255, 107, 0, 0.07) 0%, transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(155, 109, 255, 0.06) 0%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Content Container */}
      <div
        style={{
          maxWidth: 'var(--container-max, 1340px)',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {/* Label */}
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

          {/* Heading & Description */}
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
                  fontFamily: 'var(--font-headline, "Barlow Condensed", sans-serif)',
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
                Technologies and tools I use to build intelligent, scalable, and
                user-focused applications.
              </p>
            </div>

            {/* Summary Pill */}
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
                {TOTAL_SKILLS} SKILLS ACROSS {CATEGORIES.length} DISCIPLINES
              </span>
            </div>
          </div>
        </motion.div>

        {/* Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))',
            gap: '1.25rem',
          }}
        >
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              reducedMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom Summary Row */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 'clamp(3rem, 5vw, 4rem)',
            padding: '1.5rem 2rem',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, rgba(22, 22, 28, 0.6) 0%, rgba(14, 14, 18, 0.7) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {[
            { label: 'Languages', value: '4', color: '#FF6B00', icon: Terminal },
            { label: 'AI/ML Tools', value: '16+', color: '#9B6DFF', icon: Brain },
            { label: 'Cloud & DB', value: '7', color: '#00D4FF', icon: Cloud },
            { label: 'Projects Built', value: '12+', color: '#2DD4A0', icon: Sparkles },
          ].map((stat) => {
            const StatIcon = stat.icon
            return (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `${stat.color}14`,
                    border: `1px solid ${stat.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <StatIcon size={15} color={stat.color} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-headline, "Barlow Condensed", sans-serif)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      lineHeight: 1,
                      color: stat.color,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: 'rgba(255, 255, 255, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsSection
