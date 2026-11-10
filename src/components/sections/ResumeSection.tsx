import React from 'react'
import { motion } from 'framer-motion'
import {
  Download,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Cpu,
} from 'lucide-react'
import {
  personalInfo,
  experiences,
  skills,
  achievements,
} from '../../data/portfolio'

export const ResumeSection: React.FC = () => {
  const resumeUrl = '/assets/resume/Divakaran_AP_Resume.pdf'

  const highlights = [
    {
      icon: Briefcase,
      value: `${experiences.length}`,
      unit: 'INTERNSHIPS',
      label: 'Industrial Experience',
      detail: 'NSIC Chennai & Hyundai Motor India',
      color: 'var(--color-blue)',
      bg: 'rgba(0, 212, 255, 0.08)',
      border: 'rgba(0, 212, 255, 0.25)',
    },
    {
      icon: GraduationCap,
      value: personalInfo.cgpa.split('/')[0],
      unit: '/ 10 CGPA',
      label: 'Academic Standing',
      detail: 'B.E. CSE (AI & ML) • 2024–2028',
      color: 'var(--color-violet)',
      bg: 'rgba(139, 92, 246, 0.08)',
      border: 'rgba(139, 92, 246, 0.25)',
    },
    {
      icon: Cpu,
      value: `${skills.length}+`,
      unit: 'TECH SKILLS',
      label: 'Core Competencies',
      detail: 'Agentic AI, LLMs, PyTorch, AWS, Python',
      color: 'var(--color-cyan)',
      bg: 'rgba(6, 182, 212, 0.08)',
      border: 'rgba(6, 182, 212, 0.25)',
    },
    {
      icon: Award,
      value: `${achievements.length}+`,
      unit: 'HONORS',
      label: 'Major Accolades',
      detail: 'Google & Paytm Ambassador, Hackathons',
      color: 'var(--color-amber)',
      bg: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.25)',
    },
  ]

  const featuredSkillsPreview = [
    'Python',
    'Agentic AI',
    'LLMs & RAG',
    'TensorFlow',
    'Scikit-learn',
    'AWS Cloud',
    'MLOps',
    'Streamlit',
  ]

  return (
    <section
      id="resume"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        background: 'linear-gradient(180deg, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="season-badge" style={{ justifyContent: 'center' }}>
            CREDENTIALS & DOSSIER • RESUME
          </div>
          <h2
            className="section-title"
            style={{
              margin: '0 0 1rem 0',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            }}
          >
            OFFICIAL <span className="accent">RESUME</span>
          </h2>
          <p
            style={{
              maxWidth: '680px',
              margin: '0 auto',
              color: 'var(--color-text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            An ATS-optimized curriculum vitae outlining technical competencies, practical
            deployments, machine learning research, and engineering leadership.
          </p>
        </motion.div>

        {/* Highlights Stat Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  background: 'rgba(18, 18, 28, 0.75)',
                  border: `1px solid ${item.border}`,
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  backdropFilter: 'blur(16px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      background: item.bg,
                      border: `1px solid ${item.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.color,
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: item.color,
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.unit}
                  </span>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <div
                    style={{
                      fontSize: '2.4rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {item.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginTop: '0.35rem',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-text-muted)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {item.detail}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Resume Preview & Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'rgba(18, 18, 28, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Top Window Bar */}
          <div
            style={{
              padding: '1rem 1.5rem',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-secondary)',
                }}
              >
                <FileText size={14} color="var(--color-blue)" />
                <span>Divakaran_AP_Resume.pdf</span>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.1)',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <FileCheck size={14} />
              <span>ATS-OPTIMIZED & VERIFIED</span>
            </div>
          </div>

          {/* Resume Overview & Summary Body */}
          <div
            style={{
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Summary of what's inside */}
            <div>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-blue)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <Sparkles size={14} /> DOSSIER CONTENTS
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
              >
                What’s Inside the Document
              </h3>

              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {personalInfo.name} — {personalInfo.degree} candidate ({personalInfo.batch}) at{' '}
                {personalInfo.college}. Focused on building production AI/ML architectures and agentic
                systems.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <strong>Internship Trajectory:</strong> Hands-on experience at{' '}
                    <strong style={{ color: 'var(--color-text-primary)' }}>Hyundai Motor India</strong> (Digital Mfg) and{' '}
                    <strong style={{ color: 'var(--color-text-primary)' }}>NSIC Chennai</strong> (Machine Learning).
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <strong>12+ Engineering Projects:</strong> Agentic AI workflows (UNDO.AI), Insider Threat Detection,
                    and Legal RAG Question Answering (LEXI RAG).
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 size={18} color="var(--color-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    <strong>Leadership & Honors:</strong> Google Student Ambassador (Gemini Program 2026),
                    Paytm Ambassador, and NeuraX 3.0 Hackathon Finalist.
                  </span>
                </div>
              </div>

              {/* Tag badges */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '1.75rem',
                }}
              >
                {featuredSkillsPreview.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Centered CTA Panel */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '2.5rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(139, 92, 246, 0.15))',
                  border: '1px solid rgba(0, 212, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-blue)',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 35px rgba(0, 212, 255, 0.25)',
                }}
              >
                <Download size={38} />
              </div>

              <h4
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Ready for Recruitment Review
              </h4>

              <p
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.85rem',
                  maxWidth: '320px',
                  lineHeight: 1.5,
                  marginBottom: '1.75rem',
                }}
              >
                Get immediate access to the full 2-page PDF document formatted for ATS scanning and technical interviews.
              </p>

              {/* Large Centered CTA Button */}
              <a
                href={resumeUrl}
                download="Divakaran_AP_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  width: '100%',
                  maxWidth: '340px',
                  padding: '1.1rem 2rem',
                  justifyContent: 'center',
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  boxShadow: '0 0 30px rgba(0, 212, 255, 0.35)',
                }}
              >
                <Download size={20} />
                DOWNLOAD MY RESUME
              </a>

              {/* Secondary actions */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginTop: '1.25rem',
                }}
              >
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.8rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono)',
                    transition: 'color var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blue)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                >
                  <ExternalLink size={14} /> Open in Browser
                </a>

                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>•</span>

                <span
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  Updated 2026
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ResumeSection
