import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  BookOpen,
  ExternalLink,
  X,
  ZoomIn,
} from 'lucide-react'
import { certifications } from '../../data/portfolio'

interface IssuerStyle {
  color: string
  bgBadge: string
  borderColor: string
  glow: string
  tag: string
}

const getIssuerStyle = (issuer: string): IssuerStyle => {
  const normalized = issuer.toUpperCase().trim()

  if (normalized.includes('NPTEL')) {
    return {
      color: '#00D4FF',
      bgBadge: 'rgba(0, 212, 255, 0.15)',
      borderColor: '#00D4FF',
      glow: 'rgba(0, 212, 255, 0.28)',
      tag: 'NPTEL / IIT Academic',
    }
  }

  if (normalized.includes('MATLAB') || normalized.includes('MATHWORKS')) {
    return {
      color: '#F97316',
      bgBadge: 'rgba(249, 115, 22, 0.15)',
      borderColor: '#F97316',
      glow: 'rgba(249, 115, 22, 0.28)',
      tag: 'MathWorks Official',
    }
  }

  if (normalized.includes('AWS') || normalized.includes('AMAZON')) {
    return {
      color: '#F59E0B',
      bgBadge: 'rgba(245, 158, 11, 0.15)',
      borderColor: '#F59E0B',
      glow: 'rgba(245, 158, 11, 0.28)',
      tag: 'Amazon Web Services',
    }
  }

  if (normalized.includes('IBM')) {
    return {
      color: '#38BDF8',
      bgBadge: 'rgba(56, 189, 248, 0.15)',
      borderColor: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.28)',
      tag: 'IBM Professional Track',
    }
  }

  if (normalized.includes('PRODIGY')) {
    return {
      color: '#3B82F6',
      bgBadge: 'rgba(59, 130, 246, 0.15)',
      borderColor: '#3B82F6',
      glow: 'rgba(59, 130, 246, 0.28)',
      tag: 'Prodigy InfoTech',
    }
  }

  // Default / others -> violet
  return {
    color: '#8B5CF6',
    bgBadge: 'rgba(139, 92, 246, 0.15)',
    borderColor: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.28)',
    tag: 'Executive Learning',
  }
}

// ── Certificate Image Lightbox ────────────────────────────────────────────────
interface LightboxProps {
  src: string
  title: string
  onClose: () => void
}

const Lightbox: React.FC<LightboxProps> = ({ src, title, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(0,0,0,0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
        aria-label="Close certificate preview"
      >
        <X size={20} />
      </button>

      <motion.div
        initial={{ scale: 0.88, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 10 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: 'min(90vw, 920px)',
          maxHeight: '85vh',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
        }}
      >
        <img
          src={src}
          alt={title}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '12px',
          }}
        />
        {/* Title bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1rem 1.25rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {title}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
const CertificationsSection: React.FC = () => {
  const [columns, setColumns] = useState<number>(3)
  const [selectedIssuer, setSelectedIssuer] = useState<string>('ALL')
  const [lightboxCert, setLightboxCert] = useState<{ src: string; title: string } | null>(null)

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

  const issuers = ['ALL', ...Array.from(new Set(certifications.map((c) => c.issuer)))]

  const filteredCertifications =
    selectedIssuer === 'ALL'
      ? certifications
      : certifications.filter((c) => c.issuer === selectedIssuer)

  return (
    <section
      id="certifications"
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
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div className="season-badge">
            <span style={{ color: 'var(--color-violet)', fontWeight: 700 }}>
              SEASON 06
            </span>
            <span>•</span>
            <span>CERTIFICATIONS</span>
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
              <h2 className="section-title" style={{ margin: 0 }}>
                OFFICIAL{' '}
                <span
                  className="accent"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-violet), #EC4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  CREDENTIALS
                </span>
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
                Validated technical proficiencies from elite institutions including IITs, IBM, and AWS.
              </p>
            </div>

            {/* Quick stats badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1.25rem',
                borderRadius: '12px',
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <ShieldCheck size={20} color="var(--color-violet)" />
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  Verified Pedigree
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}
                >
                  {certifications.length} Certified Milestones
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '2.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {issuers.map((issuer) => {
            const isSelected = selectedIssuer === issuer
            const style = issuer === 'ALL' ? { color: '#00D4FF' } : getIssuerStyle(issuer)
            const count =
              issuer === 'ALL'
                ? certifications.length
                : certifications.filter((c) => c.issuer === issuer).length

            return (
              <button
                key={issuer}
                onClick={() => setSelectedIssuer(issuer)}
                style={{
                  padding: '0.55rem 1.1rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  border: isSelected
                    ? `1px solid ${style.color}`
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected
                    ? `linear-gradient(135deg, ${style.color}25, ${style.color}05)`
                    : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)',
                  boxShadow: isSelected ? `0 0 16px ${style.color}30` : 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                }}
              >
                <span>{issuer}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    background: isSelected ? `${style.color}40` : 'rgba(255, 255, 255, 0.08)',
                    padding: '0.1rem 0.4rem',
                    borderRadius: '9999px',
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Certifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '1.75rem',
          }}
        >
          {filteredCertifications.map((cert, index) => {
            const style = getIssuerStyle(cert.issuer)
            const isElite = cert.details?.toLowerCase().includes('elite')
            const hasImage = Boolean(cert.image)

            return (
              <motion.div
                key={`${cert.title}-${cert.issuer}`}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                style={{
                  position: 'relative',
                  background: 'rgba(18, 18, 28, 0.7)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderTop: `3px solid ${style.borderColor}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: hasImage ? 'pointer' : 'default',
                  transition: 'box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = style.borderColor
                  e.currentTarget.style.boxShadow = `0 14px 40px ${style.glow}`
                  e.currentTarget.style.background = 'rgba(22, 22, 36, 0.92)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.borderTop = `3px solid ${style.borderColor}`
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.background = 'rgba(18, 18, 28, 0.7)'
                }}
                onClick={() => {
                  if (cert.image) {
                    setLightboxCert({ src: cert.image, title: cert.title })
                  }
                }}
              >
                {/* ── Certificate Image Preview ── */}
                {cert.image && (
                  <div
                    style={{
                      position: 'relative',
                      width: '100%',
                      aspectRatio: '16/9',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                    {/* Zoom hint overlay */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(to bottom, transparent 50%, rgba(10,10,20,0.85) 100%)`,
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        padding: '0.5rem',
                        opacity: 0,
                        transition: 'opacity 0.2s ease',
                      }}
                      className="cert-image-overlay"
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          padding: '0.3rem 0.6rem',
                          borderRadius: '6px',
                          background: 'rgba(0,0,0,0.6)',
                          border: `1px solid ${style.color}60`,
                          color: style.color,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                        }}
                      >
                        <ZoomIn size={12} />
                        VIEW
                      </div>
                    </div>
                  </div>
                )}

                <style>{`
                  .cert-card:hover .cert-image-overlay { opacity: 1 !important; }
                `}</style>

                {/* ── Card Content ── */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    padding: '1.4rem 1.5rem',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* Subtle issuer corner glow */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '100px',
                      height: '100px',
                      background: `radial-gradient(circle at 100% 0%, ${style.bgBadge} 0%, transparent 70%)`,
                      pointerEvents: 'none',
                    }}
                  />

                  <div>
                    {/* Top Row: Issuer Badge & Status */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.85rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.28rem 0.65rem',
                          borderRadius: '6px',
                          background: style.bgBadge,
                          border: `1px solid ${style.color}40`,
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                          color: style.color,
                        }}
                      >
                        <BookOpen size={12} color={style.color} />
                        <span>{cert.issuer}</span>
                      </div>

                      {isElite ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '9999px',
                            background: 'rgba(245, 158, 11, 0.12)',
                            border: '1px solid rgba(245, 158, 11, 0.35)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#F59E0B',
                            fontWeight: 700,
                          }}
                        >
                          <Sparkles size={10} color="#F59E0B" />
                          ELITE
                        </div>
                      ) : (
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '9999px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.25)',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: '#10B981',
                            fontWeight: 600,
                          }}
                        >
                          <CheckCircle2 size={10} color="#10B981" />
                          VERIFIED
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.05rem',
                        fontWeight: 800,
                        lineHeight: 1.35,
                        color: '#FFFFFF',
                        marginBottom: cert.details ? '0.6rem' : '0',
                      }}
                    >
                      {cert.title}
                    </h3>

                    {/* Details */}
                    {cert.details && (
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.22rem 0.6rem',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        <Award size={12} color={style.color} />
                        <span>{cert.details}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div
                    style={{
                      marginTop: '1.1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {style.tag}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {cert.credentialLink && (
                        <a
                          href={cert.credentialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: style.color,
                            textDecoration: 'none',
                            fontWeight: 600,
                            transition: 'opacity 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                        >
                          <ExternalLink size={11} />
                          VERIFY
                        </a>
                      )}
                      {cert.image && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: style.color,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontWeight: 600,
                          }}
                        >
                          <ZoomIn size={11} />
                          VIEW CERT
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxCert && (
          <Lightbox
            src={lightboxCert.src}
            title={lightboxCert.title}
            onClose={() => setLightboxCert(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

export default CertificationsSection
