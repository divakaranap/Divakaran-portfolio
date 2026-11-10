import React, { useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  GitBranch,
  Play,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
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
  ChartPie,
  Code2,
} from 'lucide-react'
import type { Project } from '../../data/portfolio'

export interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

// Project-specific highlights database to deliver a rich, authentic streaming platform experience
const projectHighlightsMap: Record<string, string[]> = {
  'insider-threat': [
    'Real-time behavioral telemetry monitoring access anomalies and privilege escalations across cloud collaboration environments',
    'Machine learning anomaly detection model with weighted risk vectors and baseline user activity scoring',
    'Interactive Streamlit operations dashboard featuring high-velocity alerts, session forensics, and audit logs',
    'Automated containment triggers for suspicious data exfiltration signatures and policy infractions',
  ],
  'lexi-rag': [
    'Retrieval-Augmented Generation (RAG) architecture fusing specialized legal document vector embeddings with LLM reasoning',
    'Strict citation and provenance grounding to eliminate hallucination in statutory and precedent legal queries',
    'Multi-tiered semantic chunking pipeline handling complex legal codices, case notes, and jurisdiction nuances',
    'Real-time question-answering conversational interface with contextual source passage references',
  ],
  'ai-traffic': [
    'Intelligent vehicle flow and density analysis pipeline leveraging computer vision and time-series modeling',
    'Real-time junction bottleneck detection and data-driven signal interval optimization recommendations',
    'Historical congestion analytics telemetry dashboard for urban mobility pattern forecasting',
    'Lightweight modular Python architecture built for rapid edge camera integration',
  ],
  'undo-ai': [
    'Transactional execution layer for multi-step autonomous AI agent workflows using the distributed Saga pattern',
    'Reverse-order compensation action scheduler providing reliable rollback during tool or API failures',
    'Complete immutable audit execution ledger enabling deterministic workflow state inspection',
    'Zero-data-loss recovery mechanisms maintaining cross-service consistency across LLM action loops',
  ],
  'omnivoice': [
    'Low-latency full-duplex conversational voice gateway for high-throughput speech synthesis and ingestion',
    'Acoustic noise suppression with multi-turn intent extraction and conversational turn-taking management',
    'Pluggable backend dispatchers connecting voice commands directly to automated agent toolkits',
    'Optimized streaming audio buffer pipelines designed for natural, responsive human-computer dialogue',
  ],
  'fifa-predictor': [
    'Comprehensive predictive analytics engine modeling match outcomes based on historical team and player telemetry',
    'Feature engineering across form indicators, tactical setups, and head-to-head competitive metrics',
    'Probabilistic win/loss/draw distribution engine validated against major international tournament data',
    'Interactive modeling interface showcasing predictive feature importances and historical comparisons',
  ],
  'traceid-ai': [
    'Consent-grounded digital footprint intelligence engine correlating publicly available OSINT data sources',
    'Comprehensive threat exposure assessment identifying leaked credentials and unprotected public metadata',
    'Privacy-first posture audit report generator delivering actionable attack surface minimization steps',
    'Strict authorization verification safeguards ensuring lawful, ethical, and consensual perimeter analysis',
  ],
  'skillloop-ai': [
    'Agentic AI multimodal route optimization framework tailored for Chennai metropolitan transit networks',
    'Dynamic multi-transit fusion connecting suburban rail, metro, bus feeder, and micro-mobility links',
    'Real-time delay prediction and commute itinerary re-routing powered by live congestion data',
    'Carbon footprint scoring and cost-optimal travel recommendations across daily commuting hours',
  ],
  'volunteer-iq': [
    'Decentralized volunteer coordination and event dispatch engine for civic and community drives',
    'Intelligent skills-based assignment matching volunteers to mission-critical local initiatives',
    'Real-time impact metrics, shift telemetry, and volunteer hour verification records',
    'Responsive modern glassmorphic interface built for high-stress emergency event mobilization',
  ],
  'helmet-detection': [
    'Deep learning object detection and spatial classification model pinpointing two-wheeler riders without helmets',
    'High-frame-rate video inference pipeline optimized for traffic camera CCTV streams',
    'Simultaneous rider head localization, helmet bounding, and license plate region cropping',
    'Automated infraction timestamp logging and visual evidence packaging for road safety compliance',
  ],
  'car-price': [
    'Multi-variable regression modeling engine providing accurate, data-driven vehicle market valuations',
    'Robust feature engineering handling mileage, manufacture vintage, fuel efficiency, and wear tiers',
    'Automated outlier filtration and cross-validated algorithmic training pipeline',
    'Interactive price estimation dashboard with market depreciation curves and sensitivity factors',
  ],
  'mall-segmentation': [
    'Unsupervised clustering system utilizing K-Means algorithms to discover distinct consumer behavioral personas',
    'Mathematical Elbow method and Silhouette score validation for optimal cluster boundary definition',
    'Multidimensional spending-versus-income spatial mapping with high-impact persona breakdowns',
    'Actionable retail marketing insights enabling hyper-targeted promotions and churn reduction',
  ],
}

// Icon resolver for project categories and icons
const renderProjectIcon = (icon: string, size = 22) => {
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
      return <ChartPie size={size} />
    default:
      return <Sparkles size={size} />
  }
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const titleId = useId()
  const descId = useId()

  // Handle ESC key press and body scroll locking
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen, onClose])

  if (!project) return null

  const highlights = projectHighlightsMap[project.id] || [
    'Production-grade implementation with modular architecture and clean code separation',
    'Optimized performance pipelines leveraging state-of-the-art tooling and frameworks',
    'Comprehensive error handling, logging telemetry, and resilient execution fallbacks',
    'Scalable, maintainable codebase configured for continuous integration and deployment',
  ]

  const accentColor = project.color || 'var(--color-blue)'

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
          }}
        >
          {/* Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 10, 0.85)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              zIndex: 1,
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: '860px',
              maxHeight: '90vh',
              borderRadius: 'var(--radius-xl)',
              background: '#0d0d16',
              border: `1px solid rgba(255, 255, 255, 0.12)`,
              boxShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 50px ${accentColor}22`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
            }}
          >
            {/* Top Glowing Ambient Bar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: `linear-gradient(90deg, transparent, ${accentColor}, var(--color-violet), transparent)`,
                zIndex: 10,
              }}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal dialog"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                zIndex: 20,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(10, 10, 16, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                transition: 'all var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.borderColor = accentColor
                e.currentTarget.style.transform = 'scale(1.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10, 10, 16, 0.8)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <X size={20} />
            </button>

            {/* Scrollable Modal Content */}
            <div
              style={{
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: 'calc(90vh - 4px)',
                padding: '0 0 2rem 0',
              }}
            >
              {/* Hero Banner Header */}
              <div
                style={{
                  position: 'relative',
                  padding: '3rem 2.5rem 2rem 2.5rem',
                  background: `linear-gradient(180deg, ${accentColor}18 0%, rgba(13, 13, 22, 0.95) 85%, #0d0d16 100%)`,
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {/* Ambient Radial Accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '10%',
                    width: '320px',
                    height: '240px',
                    background: `radial-gradient(ellipse at center, ${accentColor}33 0%, transparent 70%)`,
                    filter: 'blur(50px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Season & Category Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-secondary)',
                    }}
                  >
                    SEASON 03 • ORIGINAL
                  </span>

                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.3rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      background: `${accentColor}22`,
                      border: `1px solid ${accentColor}55`,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: accentColor,
                    }}
                  >
                    {renderProjectIcon(project.icon, 14)}
                    {project.category}
                  </span>
                </div>

                {/* Project Title */}
                <h2
                  id={titleId}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.6rem)',
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {project.title}
                </h2>

                {/* Subtitle / Short Title */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    color: accentColor,
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: accentColor,
                      boxShadow: `0 0 10px ${accentColor}`,
                      display: 'inline-block',
                    }}
                  />
                  {project.shortTitle}
                </div>

                {/* Action Buttons Row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '1rem',
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        padding: '0.75rem 1.6rem',
                        fontSize: '0.85rem',
                        background: `linear-gradient(135deg, ${accentColor}, #0066FF)`,
                        color: '#000',
                        fontWeight: 800,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        boxShadow: `0 6px 24px ${accentColor}44`,
                      }}
                    >
                      <Play size={16} fill="currentColor" />
                      LAUNCH LIVE DEMO
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{
                        padding: '0.75rem 1.6rem',
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = accentColor
                        e.currentTarget.style.color = accentColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                        e.currentTarget.style.color = 'var(--color-text-primary)'
                      }}
                    >
                      <GitBranch size={16} />
                      VIEW REPOSITORY
                    </a>
                  )}
                </div>
              </div>

              {/* Main Content Body */}
              <div
                style={{
                  padding: '2rem 2.5rem 0 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2.25rem',
                }}
              >
                {/* 1. Synopsis / Description */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Layers size={14} color={accentColor} /> EPISODE SYNOPSIS
                  </div>
                  <p
                    id={descId}
                    style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.75,
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                {/* 2. Key Architecture Highlights */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Sparkles size={14} color={accentColor} /> SYSTEM ARCHITECTURE & KEY HIGHLIGHTS
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '1rem',
                    }}
                  >
                    {highlights.map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.85rem',
                          padding: '1rem 1.15rem',
                          borderRadius: 'var(--radius-md)',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'border-color var(--transition-fast)',
                        }}
                      >
                        <CheckCircle2
                          size={18}
                          color={accentColor}
                          style={{ flexShrink: 0, marginTop: '2px' }}
                        />
                        <span
                          style={{
                            fontSize: '0.9rem',
                            color: 'var(--color-text-primary)',
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Tech Stack Pills */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Cpu size={14} color={accentColor} /> TECHNOLOGY STACK
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.6rem',
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: '0.4rem 0.9rem',
                          borderRadius: 'var(--radius-sm)',
                          background: `${accentColor}14`,
                          border: `1px solid ${accentColor}33`,
                          color: 'var(--color-text-primary)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                        }}
                      >
                        <Code2 size={13} color={accentColor} />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Streaming Platform Metadata Strip */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                    gap: '1rem',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Release Type
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginTop: '0.2rem',
                      }}
                    >
                      Divakaran Original
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Domain Classification
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: accentColor,
                        marginTop: '0.2rem',
                      }}
                    >
                      {project.category}
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Engineering Status
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#10B981',
                        marginTop: '0.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: '#10B981',
                        }}
                      />
                      Production Ready
                    </div>
                  </div>

                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Source Availability
                    </div>
                    <div
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        marginTop: '0.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      {project.github ? 'Public Open Source' : 'Proprietary Research'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
