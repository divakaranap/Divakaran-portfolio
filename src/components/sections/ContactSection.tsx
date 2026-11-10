import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  GitBranch,
  Link2,
  Copy,
  Check,
  Code2,
  Clock,
  Radio,
  Loader2,
} from 'lucide-react'
import { personalInfo } from '../../data/portfolio'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialForm)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [copiedType, setCopiedType] = useState<'email' | 'phone' | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text)
    setCopiedType(type)
    setTimeout(() => {
      setCopiedType(null)
    }, 2500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setStatus('sending')

    const subjectLine = formData.subject.trim() || `Inquiry from ${formData.name}`
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(bodyContent)}`

    // Smooth feedback delay before dispatching mailto
    setTimeout(() => {
      window.location.href = mailtoUrl
      setStatus('success')
    }, 800)
  }

  const resetForm = () => {
    setFormData(initialForm)
    setStatus('idle')
  }

  return (
    <section
      id="contact"
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, #0d0d16 50%, #08080d 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
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
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="season-badge" style={{ marginBottom: '0.75rem' }}>
            SEASON 07 • CONTACT
          </div>
          <h2
            className="section-title"
            style={{
              margin: '0 0 1rem 0',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              letterSpacing: '-0.02em',
            }}
          >
            GET IN <span className="accent">TOUCH</span>
          </h2>
          <p
            style={{
              maxWidth: '650px',
              color: 'var(--color-text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Have an AI/ML opportunity, interested in Agentic AI systems, or looking to collaborate
            on high-impact engineering? Let’s establish a direct channel.
          </p>
        </motion.div>

        {/* Two-Column Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* LEFT COLUMN: Contact Details & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}
          >
            {/* Availability Status Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
              }}
            >
              <div style={{ position: 'relative', display: 'flex' }}>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#10B981',
                    display: 'inline-block',
                    boxShadow: '0 0 12px #10B981',
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#10B981',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Live Status • Ready to Deploy
                </div>
                <div
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500,
                  }}
                >
                  Open for AI/ML Engineering & Agentic AI Opportunities
                </div>
              </div>
            </div>

            {/* Direct Channel Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email Card */}
              <div
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(0, 212, 255, 0.12)',
                      border: '1px solid rgba(0, 212, 255, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-blue)',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={22} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Email Transmission
                    </div>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      style={{
                        color: 'var(--color-text-primary)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-blue)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(personalInfo.email, 'email')}
                  title="Copy email to clipboard"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem',
                    color: copiedType === 'email' ? 'var(--color-blue)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.15)'
                    e.currentTarget.style.borderColor = 'var(--color-blue)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                  }}
                >
                  {copiedType === 'email' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Card */}
              <div
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  transition: 'all var(--transition-base)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-violet)',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={22} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Direct Voice / WhatsApp
                    </div>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      style={{
                        color: 'var(--color-text-primary)',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        transition: 'color var(--transition-fast)',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-violet)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(personalInfo.phone, 'phone')}
                  title="Copy phone to clipboard"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.5rem',
                    color: copiedType === 'phone' ? 'var(--color-violet)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'
                    e.currentTarget.style.borderColor = 'var(--color-violet)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                  }}
                >
                  {copiedType === 'phone' ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>

              {/* Location Card */}
              <div
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(6, 182, 212, 0.12)',
                    border: '1px solid rgba(6, 182, 212, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-cyan)',
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Station Location
                  </div>
                  <div
                    style={{
                      color: 'var(--color-text-primary)',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                    }}
                  >
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid with Glowing Hover */}
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.1em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Digital Coordinates
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.75rem',
                }}
              >
                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    textDecoration: 'none',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-base)',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-blue)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <GitBranch size={22} style={{ color: 'var(--color-blue)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    GITHUB
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    @diva25042706
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    textDecoration: 'none',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-base)',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-violet)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(139, 92, 246, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Link2 size={22} style={{ color: 'var(--color-violet)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    LINKEDIN
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Divakaran A P
                  </span>
                </a>

                {/* LeetCode */}
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-panel"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem 0.5rem',
                    textDecoration: 'none',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-md)',
                    transition: 'all var(--transition-base)',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-amber)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(245, 158, 11, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <Code2 size={22} style={{ color: 'var(--color-amber)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                    LEETCODE
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    @Divakaran276
                  </span>
                </a>
              </div>
            </div>

            {/* Quick response badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Clock size={14} color="var(--color-blue)" />
              <span>Standard response window: within 24 hours (IST UTC+5:30)</span>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              background: 'rgba(18, 18, 28, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(20px)',
              padding: '2.5rem',
              overflow: 'hidden',
            }}
          >
            {/* Top decorative gradient line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--color-blue), var(--color-violet), transparent)',
              }}
            />

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                /* SUCCESS STATE */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '3rem 1rem',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'rgba(0, 212, 255, 0.12)',
                      border: '2px solid var(--color-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-blue)',
                      marginBottom: '1.5rem',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
                    }}
                  >
                    <CheckCircle2 size={38} />
                  </motion.div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    TRANSMISSION DISPATCHED
                  </h3>

                  <p
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.95rem',
                      maxWidth: '420px',
                      lineHeight: 1.6,
                      marginBottom: '2rem',
                    }}
                  >
                    Your default mail client has been opened with your pre-composed transmission.
                    Thank you for reaching out — I will get back to you promptly.
                  </p>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-primary"
                    style={{
                      padding: '0.75rem 1.75rem',
                      fontSize: '0.85rem',
                    }}
                  >
                    SEND ANOTHER TRANSMISSION
                  </button>
                </motion.div>
              ) : (
                /* FORM STATE */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ marginBottom: '2rem' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-blue)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Radio size={14} /> SECURE TRANSMISSION CHANNEL
                    </div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                        margin: 0,
                      }}
                    >
                      Send a Direct Message
                    </h3>
                  </div>

                  <form action="#" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Your Name <span style={{ color: 'var(--color-blue)' }}>*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. Maya Lin"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${
                            focusedField === 'name' ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.1)'
                          }`,
                          boxShadow:
                            focusedField === 'name' ? '0 0 16px rgba(0, 212, 255, 0.25)' : 'none',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all var(--transition-fast)',
                        }}
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Your Email <span style={{ color: 'var(--color-blue)' }}>*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. maya@enterprise.com"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${
                            focusedField === 'email' ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.1)'
                          }`,
                          boxShadow:
                            focusedField === 'email' ? '0 0 16px rgba(0, 212, 255, 0.25)' : 'none',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all var(--transition-fast)',
                        }}
                      />
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label
                        htmlFor="subject"
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. AI/ML Engineering Collaboration"
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${
                            focusedField === 'subject' ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.1)'
                          }`,
                          boxShadow:
                            focusedField === 'subject' ? '0 0 16px rgba(0, 212, 255, 0.25)' : 'none',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          transition: 'all var(--transition-fast)',
                        }}
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                          letterSpacing: '0.05em',
                          marginBottom: '0.5rem',
                          textTransform: 'uppercase',
                        }}
                      >
                        Message <span style={{ color: 'var(--color-blue)' }}>*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell me about your opportunity, project vision, or technical inquiry..."
                        style={{
                          width: '100%',
                          padding: '0.875rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: `1px solid ${
                            focusedField === 'message' ? 'var(--color-blue)' : 'rgba(255, 255, 255, 0.1)'
                          }`,
                          boxShadow:
                            focusedField === 'message' ? '0 0 16px rgba(0, 212, 255, 0.25)' : 'none',
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.95rem',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: '120px',
                          transition: 'all var(--transition-fast)',
                        }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary"
                      style={{
                        width: '100%',
                        padding: '1rem 2rem',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        marginTop: '0.5rem',
                        opacity: status === 'sending' ? 0.7 : 1,
                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 size={18} className="spin-slow" style={{ animation: 'spin-slow 1s linear infinite' }} />
                          TRANSMITTING VIA MAILTO...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          SEND MESSAGE
                        </>
                      )}
                    </button>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontSize: '0.75rem',
                        color: 'var(--color-text-muted)',
                        marginTop: '0.25rem',
                      }}
                    >
                      <span>Transmitted directly to {personalInfo.email}</span>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
