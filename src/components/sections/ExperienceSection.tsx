import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Briefcase, MapPin, Calendar, Trophy, Award, Code2, Zap } from 'lucide-react'
import { experiences, achievements } from '../../data/portfolio'

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] } },
})

const achievementIcons: Record<string, React.ReactNode> = {
  award: <Award size={18} />,
  'badge-check': <Trophy size={18} />,
  zap: <Zap size={18} />,
  flame: <Zap size={18} />,
  target: <Trophy size={18} />,
  code: <Code2 size={18} />,
}

const achievementColors = [
  { color: '#FF6B00', bg: 'rgba(255,107,0,0.12)',   border: 'rgba(255,107,0,0.3)' },
  { color: '#3B9EFF', bg: 'rgba(59,158,255,0.12)',   border: 'rgba(59,158,255,0.3)' },
  { color: '#9B6DFF', bg: 'rgba(155,109,255,0.12)',  border: 'rgba(155,109,255,0.3)' },
  { color: '#2DD4A0', bg: 'rgba(45,212,160,0.12)',   border: 'rgba(45,212,160,0.3)' },
  { color: '#FF4F9A', bg: 'rgba(255,79,154,0.12)',   border: 'rgba(255,79,154,0.3)' },
  { color: '#F5C518', bg: 'rgba(245,197,24,0.12)',   border: 'rgba(245,197,24,0.3)' },
]

export const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion()

  const viewportOptions = { once: true, amount: 0.15 }

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        background: 'var(--color-bg-primary)',
        overflow: 'hidden',
        padding: 'var(--section-padding)',
      }}
    >
      {/* Subtle grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        zIndex: 0,
      }} />

      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* ── EXPERIENCE ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '5rem' }}
        >
          <div className="section-label">PROFESSIONAL JOURNEY</div>
          <h2 className="section-title">
            EXPERIENCE &{' '}
            <span className="accent">INTERNSHIPS</span>
          </h2>

          {/* Timeline */}
          <div style={{ position: 'relative', marginTop: '3rem' }}>
            {/* Vertical orange line */}
            <div style={{
              position: 'absolute', left: '0', top: 0, bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, var(--color-orange), rgba(255,107,0,0.1))',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingLeft: '2.5rem' }}>
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.company + i}
                  variants={fadeUp(i * 0.15)}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={viewportOptions}
                  style={{ position: 'relative' }}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute', left: '-2.9rem', top: '0.2rem',
                    width: '14px', height: '14px', borderRadius: '50%',
                    background: 'var(--gradient-fire)',
                    boxShadow: '0 0 20px rgba(255,107,0,0.6)',
                    border: '2px solid var(--color-black)',
                  }} />

                  <div style={{
                    padding: '1.5rem 2rem',
                    background: 'rgba(255,255,255,0.025)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 'var(--radius-md)',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.3s ease, background 0.3s ease',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'
                      e.currentTarget.style.background = 'rgba(255,107,0,0.04)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                      e.currentTarget.style.background = 'rgba(255,255,255,0.025)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <div>
                        <h3 style={{
                          fontFamily: 'var(--font-headline)', fontWeight: 800,
                          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                          letterSpacing: '0.03em', textTransform: 'uppercase',
                          color: '#fff', marginBottom: '0.3rem',
                        }}>{exp.company}</h3>
                        <p style={{
                          fontFamily: 'var(--font-display)', fontSize: '0.95rem',
                          color: 'var(--color-orange)', fontWeight: 600,
                        }}>{exp.role}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <Calendar size={12} color="var(--color-text-muted)" />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{exp.period}</span>
                        </div>
                        {exp.location && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <MapPin size={12} color="var(--color-text-muted)" />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>{exp.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                      padding: '0.3rem 0.7rem', borderRadius: '999px',
                      background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.25)',
                    }}>
                      <Briefcase size={12} color="var(--color-orange)" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-orange)', letterSpacing: '0.12em' }}>INTERNSHIP</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── ACHIEVEMENTS ── */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOptions}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">RECOGNITION</div>
          <h2 className="section-title">
            ACHIEVEMENTS &{' '}
            <span className="accent">MILESTONES</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
          }}>
            {achievements.map((ach, i) => {
              const palette = achievementColors[i % achievementColors.length]
              return (
                <motion.div
                  key={ach.title}
                  variants={fadeUp(i * 0.07)}
                  initial={shouldReduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={viewportOptions}
                  whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                  style={{
                    padding: '1.4rem',
                    background: palette.bg,
                    border: `1px solid ${palette.border}`,
                    borderRadius: 'var(--radius-md)',
                    display: 'flex', flexDirection: 'column', gap: '0.75rem',
                    cursor: 'default',
                    transition: 'box-shadow 0.3s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px ${palette.bg}` }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: `rgba(${parseInt(palette.color.slice(1,3),16)},${parseInt(palette.color.slice(3,5),16)},${parseInt(palette.color.slice(5,7),16)},0.15)`,
                    color: palette.color,
                  }}>
                    {achievementIcons[ach.icon] || <Trophy size={18} />}
                  </div>
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '0.95rem', color: '#fff', marginBottom: '0.3rem',
                    }}>{ach.title}</h4>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{ach.description}</p>
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

export default ExperienceSection
