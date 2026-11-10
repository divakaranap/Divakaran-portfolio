import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  Calendar,
  Sparkles,
  Bot,
  Brain,
  Workflow,
  Eye,
  Cpu,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolio';

// ── Technical Interests Data ────────────────────────────────────────────────
const interests = [
  {
    name: 'Agentic AI',
    tag: 'AUTONOMOUS',
    code: '01',
    desc: 'Multi-agent workflows, tool orchestration & transactional rollback execution',
    icon: Bot,
  },
  {
    name: 'Large Language Models',
    tag: 'LLM & RAG',
    code: '02',
    desc: 'Retrieval-augmented generation, context grounding & neural QA',
    icon: Brain,
  },
  {
    name: 'Generative AI',
    tag: 'SYNTHESIS',
    code: '03',
    desc: 'Multimodal model prompting, diffusion pipelines & synthetic media',
    icon: Sparkles,
  },
  {
    name: 'MLOps',
    tag: 'PIPELINES',
    code: '04',
    desc: 'Automated model lifecycle, deployment, telemetry & registry',
    icon: Workflow,
  },
  {
    name: 'Computer Vision',
    tag: 'SPATIAL',
    code: '05',
    desc: 'Real-time object detection, safety tracking & spatial deep learning',
    icon: Eye,
  },
  {
    name: 'NLP',
    tag: 'SEMANTICS',
    code: '06',
    desc: 'Semantic embeddings, information extraction & legal text analysis',
    icon: Cpu,
  },
];

// ── Rays Configuration for Abstract Editorial Graphic ──────────────────────
const radiatingRays = [
  { angle: 18, r1: 145, r2: 248, width: 1.5, dot: 3.5 },
  { angle: 42, r1: 145, r2: 234, width: 2.0, dot: 4.0 },
  { angle: 72, r1: 145, r2: 254, width: 1.5, dot: 3.5 },
  { angle: 108, r1: 145, r2: 238, width: 1.8, dot: 3.5 },
  { angle: 138, r1: 145, r2: 250, width: 2.0, dot: 4.0 },
  { angle: 168, r1: 145, r2: 242, width: 1.5, dot: 3.5 },
  { angle: 204, r1: 145, r2: 250, width: 2.0, dot: 4.0 },
  { angle: 238, r1: 145, r2: 236, width: 1.5, dot: 3.5 },
  { angle: 280, r1: 145, r2: 254, width: 1.8, dot: 3.5 },
  { angle: 312, r1: 145, r2: 240, width: 2.0, dot: 4.0 },
  { angle: 342, r1: 145, r2: 248, width: 1.5, dot: 3.5 },
];

export const AboutSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Pre-calculate line endpoints for SVG rays
  const computedRays = useMemo(() => {
    return radiatingRays.map((ray) => {
      const rad = (ray.angle * Math.PI) / 180;
      return {
        ...ray,
        x1: 270 + ray.r1 * Math.cos(rad),
        y1: 270 - ray.r1 * Math.sin(rad),
        x2: 270 + ray.r2 * Math.cos(rad),
        y2: 270 - ray.r2 * Math.sin(rad),
      };
    });
  }, []);

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        backgroundColor: '#080808',
        padding: 'var(--section-padding)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* ── Scoped CSS for Editorial Layout ── */}
      <style>{`
        .about-editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 4rem;
          align-items: center;
          max-width: var(--container-max);
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .about-interests-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }

        .about-floating-card {
          background: rgba(14, 14, 14, 0.88);
          border: 1px solid rgba(255, 107, 0, 0.32);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          box-shadow: 0 14px 40px rgba(0, 0, 0, 0.75), 0 0 24px rgba(255, 107, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-floating-card:hover {
          border-color: var(--color-orange);
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.85), 0 0 32px rgba(255, 107, 0, 0.22);
          transform: translateY(-3px) scale(1.02);
        }

        .about-interest-card {
          padding: 1rem 1.15rem;
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: var(--radius-sm);
          transition: all 0.28s ease;
          position: relative;
          overflow: hidden;
        }

        .about-interest-card:hover {
          background: rgba(255, 107, 0, 0.06);
          border-color: rgba(255, 107, 0, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .about-editorial-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        @media (max-width: 640px) {
          .about-interests-grid {
            grid-template-columns: 1fr;
          }
          .about-graphic-wrapper {
            min-height: 460px !important;
          }
          .about-floating-card {
            padding: 0.85rem 1rem !important;
          }
        }
      `}</style>

      {/* ── Background Subtle Glow & Architecture Watermark ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 65% 55% at 85% 50%, rgba(255, 107, 0, 0.05) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 15% 20%, rgba(255, 255, 255, 0.02) 0%, transparent 60%)
          `,
          zIndex: 1,
        }}
      />

      {/* ── Giant Faint Watermark Text ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-headline)',
          fontWeight: 900,
          fontSize: 'clamp(6rem, 22vw, 19rem)',
          letterSpacing: '-0.03em',
          color: 'rgba(255, 107, 0, 0.018)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        DOSSIER
      </div>

      {/* ── Main Two-Column Container ── */}
      <div className="about-editorial-grid">
        {/* ================================================================== */}
        {/* LEFT COLUMN: Label, Headline, Narrative, Education & Interests    */}
        {/* ================================================================== */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          {/* Section Monospace Label with Orange Accent Dash */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-orange)',
              marginBottom: '1.2rem',
            }}
          >
            <span
              style={{
                width: '32px',
                height: '2px',
                backgroundColor: 'var(--color-orange)',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(255, 107, 0, 0.6)',
              }}
            />
            ABOUT ME
          </motion.div>

          {/* Large Headline: BEYOND THE CODE. in Barlow Condensed weight 900 fire gradient */}
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-headline)',
              fontWeight: 900,
              fontSize: 'clamp(2.9rem, 5.5vw, 4.8rem)',
              lineHeight: 0.96,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              background: 'var(--gradient-fire)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              margin: '0 0 1.85rem 0',
            }}
          >
            BEYOND THE CODE.
          </motion.h2>

          {/* Personal Intro Text */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
              lineHeight: 1.85,
              color: 'rgba(255, 255, 255, 0.85)',
              margin: '0 0 2.2rem 0',
            }}
          >
            An aspiring AI/ML Engineer pursuing{' '}
            <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>
              {personalInfo.degree}
            </strong>{' '}
            at{' '}
            <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>
              {personalInfo.college}
            </strong>{' '}
            (Batch {personalInfo.batch}), currently in{' '}
            <span style={{ color: 'var(--color-orange)', fontWeight: 600 }}>
              {personalInfo.currentYear}
            </span>{' '}
            with CGPA{' '}
            <span style={{ color: 'var(--color-orange)', fontWeight: 600 }}>
              {personalInfo.cgpa}
            </span>
            . Based in{' '}
            <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>
              {personalInfo.location}
            </strong>
            .
          </motion.p>

          {/* Education Highlight Cards Strip */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.85rem',
              marginBottom: '2.5rem',
            }}
          >
            {/* Degree Card */}
            <div
              style={{
                padding: '1rem 1.15rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderLeft: '3px solid var(--color-orange)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                DEGREE PROGRAM
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.35,
                }}
              >
                B.E. CSE — AI & ML
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-orange-light)',
                  marginTop: '0.3rem',
                }}
              >
                Batch {personalInfo.batch}
              </div>
            </div>

            {/* Institution Card */}
            <div
              style={{
                padding: '1rem 1.15rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderLeft: '3px solid var(--color-orange)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                INSTITUTION
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.35,
                }}
              >
                Vel Tech High Tech
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.3rem',
                }}
              >
                Chennai, Tamil Nadu
              </div>
            </div>

            {/* Academic Standing Card */}
            <div
              style={{
                padding: '1rem 1.15rem',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderLeft: '3px solid var(--color-orange)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.64rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                ACADEMIC CGPA
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.45rem',
                  fontWeight: 900,
                  color: 'var(--color-orange)',
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                }}
              >
                {personalInfo.cgpa}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.3rem',
                }}
              >
                {personalInfo.currentYear} Standing
              </div>
            </div>
          </motion.div>

          {/* Current Interests Section Header */}
          <div style={{ marginBottom: '1.1rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                color: 'var(--color-orange)',
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-orange)',
                  boxShadow: '0 0 10px rgba(255, 107, 0, 0.8)',
                }}
              />
              CURRENT TECHNICAL INTERESTS
            </div>
          </div>

          {/* Interests Animated List Items */}
          <div className="about-interests-grid">
            {interests.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  className="about-interest-card"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: shouldReduceMotion ? 0 : 0.08 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.55rem',
                      }}
                    >
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: 'rgba(255, 107, 0, 0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-orange)',
                        }}
                      >
                        <Icon size={15} />
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-headline)',
                          fontSize: '1.18rem',
                          fontWeight: 800,
                          letterSpacing: '0.03em',
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                          lineHeight: 1.1,
                        }}
                      >
                        {item.name}
                      </span>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.1em',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      [{item.code}]
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      lineHeight: 1.5,
                      color: 'var(--color-text-secondary)',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: Abstract Editorial Graphic Composition (CSS / SVG)   */}
        {/* ================================================================== */}
        <div
          className="about-graphic-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '540px',
            minHeight: '540px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
          }}
        >
          {/* Subtle Ambient Radial Backlight behind the Circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 107, 0, 0.16) 0%, rgba(230, 48, 32, 0.05) 45%, transparent 70%)',
              filter: 'blur(45px)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* ── Abstract SVG Graphic Composition ── */}
          <svg
            viewBox="0 0 540 540"
            style={{
              width: '100%',
              height: '100%',
              maxWidth: '540px',
              maxHeight: '540px',
              position: 'relative',
              zIndex: 2,
              overflow: 'visible',
            }}
          >
            <defs>
              {/* Radial gradient for large white/gray circle core */}
              <radialGradient id="aboutCircleCoreGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
                <stop offset="35%" stopColor="#999999" stopOpacity="0.05" />
                <stop offset="75%" stopColor="#252525" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#080808" stopOpacity="0" />
              </radialGradient>

              {/* Fire gradient for radiating accent rays */}
              <linearGradient id="aboutRayFireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="1" />
                <stop offset="100%" stopColor="#E63020" stopOpacity="0.6" />
              </linearGradient>

              {/* Orange node glow filter */}
              <filter id="beaconOrangeGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static Background Subtle Orbit Rings */}
            <circle
              cx="270"
              cy="270"
              r="248"
              fill="none"
              stroke="rgba(255, 255, 255, 0.04)"
              strokeWidth="1"
              strokeDasharray="3 6"
            />
            <circle
              cx="270"
              cy="270"
              r="205"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray="6 8"
            />

            {/* Rotating Layer with Technical Angle Ticks and Dashed Orbital */}
            <motion.g
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '270px 270px' }}
            >
              <circle
                cx="270"
                cy="270"
                r="180"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
                strokeDasharray="8 14"
              />
              <circle
                cx="270"
                cy="270"
                r="160"
                fill="none"
                stroke="rgba(255, 107, 0, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 24"
              />

              {/* Degree calibration markers */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const x1 = 270 + 176 * Math.cos(rad);
                const y1 = 270 - 176 * Math.sin(rad);
                const x2 = 270 + 184 * Math.cos(rad);
                const y2 = 270 - 184 * Math.sin(rad);
                return (
                  <line
                    key={deg}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255, 107, 0, 0.6)"
                    strokeWidth="1.5"
                  />
                );
              })}
            </motion.g>

            {/* ── The Large White/Gray Circle ── */}
            <circle
              cx="270"
              cy="270"
              r="145"
              fill="url(#aboutCircleCoreGrad)"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.5"
            />

            {/* Subtle inner concentric tracks within the circle */}
            <circle
              cx="270"
              cy="270"
              r="130"
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
            <circle
              cx="270"
              cy="270"
              r="98"
              fill="none"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
              strokeDasharray="5 5"
            />

            {/* ── Orange Accent Lines Radiating Outward ── */}
            {computedRays.map((ray, index) => (
              <g key={index}>
                {/* Radiating Ray Line */}
                <line
                  x1={ray.x1}
                  y1={ray.y1}
                  x2={ray.x2}
                  y2={ray.y2}
                  stroke="url(#aboutRayFireGrad)"
                  strokeWidth={ray.width}
                  strokeLinecap="round"
                  opacity={0.9}
                />
                {/* Glowing Outer Terminal Node */}
                <circle
                  cx={ray.x2}
                  cy={ray.y2}
                  r={ray.dot}
                  fill="#FF6B00"
                  filter="url(#beaconOrangeGlow)"
                />
                {/* Outer Node Subtle Halo */}
                <circle
                  cx={ray.x2}
                  cy={ray.y2}
                  r={ray.dot * 2}
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="0.75"
                  opacity={0.35}
                />
              </g>
            ))}

            {/* Core Dark Center Disc */}
            <circle
              cx="270"
              cy="270"
              r="52"
              fill="#0A0A0A"
              stroke="rgba(255, 107, 0, 0.45)"
              strokeWidth="1.5"
            />

            {/* Center Orange Glowing Beacon Node */}
            <circle
              cx="270"
              cy="270"
              r="6"
              fill="#FF6B00"
              filter="url(#beaconOrangeGlow)"
            />
            <circle
              cx="270"
              cy="270"
              r="14"
              fill="none"
              stroke="#FF6B00"
              strokeWidth="1"
              opacity="0.5"
            />

            {/* Core Technical Typography */}
            <text
              x="270"
              y="256"
              textAnchor="middle"
              fill="var(--color-orange)"
              fontSize="8"
              fontFamily="var(--font-mono)"
              letterSpacing="2"
              fontWeight="700"
            >
              DIVAKARAN // SYS-CORE
            </text>
            <text
              x="270"
              y="286"
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.7)"
              fontSize="7.5"
              fontFamily="var(--font-mono)"
              letterSpacing="1.2"
            >
              13.08°N 80.27°E
            </text>
          </svg>

          {/* ================================================================ */}
          {/* 3 FLOATING OVERLAY INFO CARDS (Location, College, Batch)          */}
          {/* ================================================================ */}

          {/* CARD 1: Location ('Chennai, India') — Top-Left */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: '4%',
              left: '0%',
              zIndex: 4,
              maxWidth: '240px',
              width: '100%',
            }}
          >
            <motion.div
              className="about-floating-card"
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-orange)',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                  fontWeight: 700,
                }}
              >
                <MapPin size={13} color="var(--color-orange)" />
                LOCATION BASE
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                Chennai, India
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '0.35rem',
                }}
              >
                Tamil Nadu • 13.08° N, 80.27° E
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 2: College ('Vel Tech') — Bottom-Left */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              position: 'absolute',
              bottom: '5%',
              left: '2%',
              zIndex: 4,
              maxWidth: '250px',
              width: '100%',
            }}
          >
            <motion.div
              className="about-floating-card"
              animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-orange)',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                  fontWeight: 700,
                }}
              >
                <GraduationCap size={14} color="var(--color-orange)" />
                COLLEGE
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  lineHeight: 1.1,
                }}
              >
                Vel Tech
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.72rem',
                  color: 'var(--color-text-secondary)',
                  marginTop: '0.3rem',
                  lineHeight: 1.3,
                }}
              >
                Dr. Rangarajan Dr. Sakunthala Engineering College
              </div>
            </motion.div>
          </motion.div>

          {/* CARD 3: Batch ('2024-2028') — Top-Right */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{
              position: 'absolute',
              top: '25%',
              right: '0%',
              zIndex: 4,
              maxWidth: '240px',
              width: '100%',
            }}
          >
            <motion.div
              className="about-floating-card"
              animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5.0, ease: 'easeInOut' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.4rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.14em',
                    color: 'var(--color-orange)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                  }}
                >
                  <Calendar size={13} color="var(--color-orange)" />
                  BATCH
                </div>

                {/* Status Dot */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px',
                    background: 'rgba(255, 107, 0, 0.12)',
                    border: '1px solid rgba(255, 107, 0, 0.4)',
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-orange)',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.58rem',
                      color: 'var(--color-orange-light)',
                      fontWeight: 700,
                    }}
                  >
                    ACTIVE
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-headline)',
                  fontSize: '1.35rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.03em',
                  lineHeight: 1.1,
                }}
              >
                2024–2028
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--color-text-secondary)',
                  marginTop: '0.35rem',
                }}
              >
                {personalInfo.currentYear} • CGPA {personalInfo.cgpa}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
