import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronDown, ArrowUpRight, Download, MapPin,
  Code2, Coffee, Brain, Layers, Sparkles, Bot, Cloud, Cpu, GitBranch, Settings,
  Briefcase, Camera, Mail,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import portrait from '../../assets/portrait-pro.png';

gsap.registerPlugin(ScrollTrigger);


/* ═══════════════════════════════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════════════════════════════ */
interface TechTag {
  label: string;
  color: string;
  icon: React.ReactNode;
  side: 'left' | 'right';
  topPct: number;
  leftPct?: number;
  rightPct?: number;
  delay: number;
  duration: number;
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */
const TECH_TAGS: TechTag[] = [
  { label: 'Python',           color: '#FF6B00', icon: <Code2 size={13} />,     side: 'left',  topPct: 16, leftPct: 31, delay: 0,    duration: 7   },
  { label: 'Java',             color: '#3B9EFF', icon: <Coffee size={13} />,    side: 'left',  topPct: 28, leftPct: 28, delay: 1.4,  duration: 8   },
  { label: 'Machine\nLearning',color: '#2DD4A0', icon: <Brain size={13} />,     side: 'left',  topPct: 42, leftPct: 25, delay: 0.7,  duration: 6.5 },
  { label: 'Agentic AI',       color: '#F5C518', icon: <Bot size={13} />,       side: 'left',  topPct: 58, leftPct: 27, delay: 2,    duration: 7.5 },
  { label: 'GitHub',           color: '#94A3B8', icon: <GitBranch size={13} />, side: 'left',  topPct: 71, leftPct: 24, delay: 0.9,  duration: 9   },
  { label: 'GenAI',            color: '#FF4F9A', icon: <Sparkles size={13} />,  side: 'right', topPct: 16, rightPct: 27, delay: 1.5, duration: 7   },
  { label: 'Deep\nLearning',   color: '#9B6DFF', icon: <Layers size={13} />,    side: 'right', topPct: 30, rightPct: 21, delay: 0.4, duration: 8   },
  { label: 'AWS',              color: '#FF9900', icon: <Cloud size={13} />,     side: 'right', topPct: 44, rightPct: 25, delay: 1.1, duration: 6   },
  { label: 'TensorFlow',       color: '#2DD4A0', icon: <Cpu size={13} />,       side: 'right', topPct: 58, rightPct: 22, delay: 0.6, duration: 7.5 },
  { label: 'MLOps',            color: '#3B9EFF', icon: <Settings size={13} />,  side: 'right', topPct: 71, rightPct: 24, delay: 1.8, duration: 8   },
];

const STATS = [
  { value: '12+', label: 'AI PROJECTS'   },
  { value: '5+',  label: 'HACKATHONS'    },
  { value: '20+', label: 'TECHNOLOGIES'  },
];

const ROLES = ['AI & ML ENGINEER.', 'AGENTIC AI BUILDER.', 'DEEP LEARNING DEV.'];

const SOCIALS = [
  { icon: <GitBranch size={16} />, href: 'https://github.com/divakaran-ap',       label: 'GitHub'    },
  { icon: <Briefcase size={16} />, href: 'https://linkedin.com/in/divakaran-ap',  label: 'LinkedIn'  },
  { icon: <Camera size={16} />,    href: '#',                                      label: 'Instagram' },
  { icon: <Mail size={16} />,      href: 'mailto:divakaranperumal27@gmail.com',    label: 'Email'     },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING TAG SUB-COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
const FloatingTag: React.FC<{ tag: TechTag; reduced: boolean }> = ({ tag, reduced }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: `${tag.topPct}%`,
    ...(tag.side === 'left'
      ? { left: `${tag.leftPct ?? 28}%` }
      : { right: `${tag.rightPct ?? 22}%` }),
    display: 'flex',
    alignItems: 'center',
    gap: '0.45rem',
    padding: '0.35rem 0.85rem 0.35rem 0.55rem',
    borderRadius: '999px',
    background: `${tag.color}14`,
    border: `1px solid ${tag.color}45`,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    color: tag.color,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 'clamp(0.58rem, 1vw, 0.7rem)',
    fontWeight: 600,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
    zIndex: 3,
    pointerEvents: 'none',
    boxShadow: `0 0 18px ${tag.color}20, inset 0 0 8px ${tag.color}08`,
  };

  return (
    <motion.div
      style={style}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={reduced ? { opacity: 1, scale: 1 } : {
        opacity: [0, 1, 1, 1],
        scale: [0.7, 1, 1, 1],
        y: [0, -12, 0, -8, 0],
      }}
      transition={
        reduced
          ? { duration: 0.3, delay: tag.delay }
          : {
              opacity: { duration: 0.6, delay: tag.delay + 0.4 },
              scale:   { duration: 0.6, delay: tag.delay + 0.4 },
              y: {
                duration: tag.duration,
                delay: tag.delay + 1,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }
      }
    >
      {/* Icon */}
      <span style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '22px', height: '22px', borderRadius: '50%',
        background: `${tag.color}18`,
        border: `1px solid ${tag.color}30`,
        flexShrink: 0,
      }}>
        {tag.icon}
      </span>
      {tag.label.replace('\n', ' ')}
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN HERO SECTION
   ═══════════════════════════════════════════════════════════════════════════ */
export const HeroSection: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ── Parallax ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgTextY    = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '28%']);
  const portraitY  = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  const glowScale  = useTransform(scrollYProgress, [0, 0.5], [1, 1.18]);

  /* ── 3D Tilt on mouse move (desktop only) ── */
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!portraitRef.current || window.innerWidth < 768) return;
    const rect = portraitRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -3.5;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 3.5;
    setTilt({ x: Math.max(-5, Math.min(5, rx)), y: Math.max(-5, Math.min(5, ry)) });
  }, []);

  useEffect(() => {
    if (reduced) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduced, handleMouseMove]);

  /* ── GSAP ScrollTrigger: Glow + portrait entrance ── */
  useEffect(() => {
    if (reduced || !glowRef.current || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { opacity: 0.5 },
        {
          opacity: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '70% top',
            scrub: 1.5,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);


  /* ── Typewriter ── */
  const [roleIdx, setRoleIdx]   = useState(0);
  const [typed, setTyped]       = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) { setTyped(ROLES[0]); return; }
    const cur = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting) {
      if (typed.length < cur.length) {
        t = setTimeout(() => setTyped(cur.slice(0, typed.length + 1)), 75);
      } else {
        t = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(cur.slice(0, typed.length - 1)), 38);
      } else {
        setDeleting(false);
        setRoleIdx(p => (p + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx, reduced]);

  /* ── Helpers ── */
  const scrollTo = (id: string) => {
    if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Keyframes & Responsive ── */}
      <style>{`
        @keyframes heroPulse {
          0%,100% { opacity: 0.55; }
          50%     { opacity: 0.75; }
        }
        @keyframes cursorBlink {
          0%,100% { opacity: 1; }
          50%     { opacity: 0; }
        }
        @keyframes rimGlow {
          0%,100% { opacity: 0.5; }
          50%     { opacity: 0.8; }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.45; transform: scale(1); }
          50%     { opacity: 0.75; transform: scale(1.06); }
        }
        @keyframes portraitFloat {
          0%,100% { transform: translateY(0px); }
          50%     { transform: translateY(-6px); }
        }

        /* ── TABLET ── */
        @media (max-width: 1024px) {
          .hero-left-panel {
            left: clamp(1rem, 3vw, 2.5rem) !important;
            max-width: clamp(200px, 22vw, 280px) !important;
          }
          .hero-right-stats {
            right: clamp(1rem, 2.5vw, 2rem) !important;
            gap: 1rem !important;
          }
          .hero-portrait-wrap {
            width: clamp(260px, 36vw, 460px) !important;
          }
          .hero-bg-text {
            font-size: clamp(5rem, 15vw, 14rem) !important;
          }
          .hero-tags {
            display: none !important;
          }
          .hero-tablet-tags {
            display: flex !important;
          }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-left-panel {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            align-items: center !important;
            text-align: center !important;
            max-width: 100% !important;
            padding: 5.5rem 1.5rem 1rem !important;
            z-index: 5 !important;
          }
          .hero-name-text {
            font-size: clamp(2.6rem, 12vw, 4.2rem) !important;
          }
          .hero-name-ap {
            font-size: clamp(2.2rem, 10vw, 3.5rem) !important;
          }
          .hero-bg-text {
            font-size: clamp(3.5rem, 20vw, 7rem) !important;
            letter-spacing: -0.03em !important;
          }
          .hero-portrait-wrap {
            position: relative !important;
            left: auto !important;
            bottom: auto !important;
            transform: none !important;
            width: clamp(220px, 60vw, 340px) !important;
            margin: -1rem auto 0 !important;
          }
          .hero-right-stats {
            display: none !important;
          }
          .hero-tags {
            display: none !important;
          }
          .hero-tablet-tags {
            display: none !important;
          }
          .hero-mobile-stats-row {
            display: flex !important;
          }
          .hero-mobile-tags-row {
            display: flex !important;
          }
          .hero-bottom-bar {
            flex-direction: column !important;
            gap: 0.6rem !important;
            padding: 0.75rem 1rem !important;
          }
          .hero-bottom-left, .hero-bottom-right {
            display: none !important;
          }
        }

        /* ── Ensure hidden on desktop ── */
        @media (min-width: 769px) {
          .hero-mobile-stats-row { display: none !important; }
          .hero-mobile-tags-row  { display: none !important; }
        }
        @media (min-width: 1025px) {
          .hero-tablet-tags { display: none !important; }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 0 — Ambient radial glows
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 55% 60% at 50% 85%, rgba(255,60,0,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 40% 45% at 50% 55%, rgba(255,100,0,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 30% 35% at 50% 95%, rgba(255,40,0,0.12) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'heroPulse 5s ease-in-out infinite',
        }}
      />

      {/* Floating geometric shapes for 3D depth */}
      <div className="floating-geo" style={{
        width: '60px', height: '60px', top: '15%', left: '8%',
        transform: 'rotate(45deg)', animationDelay: '0s',
      }} />
      <div className="floating-geo" style={{
        width: '40px', height: '40px', top: '70%', right: '12%',
        borderRadius: '50%', animationDelay: '3s', animationDuration: '15s',
      }} />
      <div className="floating-geo" style={{
        width: '80px', height: '80px', bottom: '25%', left: '15%',
        transform: 'rotate(30deg)', animationDelay: '6s', animationDuration: '18s', opacity: 0.15,
      }} />
      <div className="floating-geo" style={{
        width: '35px', height: '35px', top: '30%', right: '25%',
        transform: 'rotate(60deg)', animationDelay: '2s', animationDuration: '14s',
      }} />

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 1 — Giant PORTFOLIO text
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          y: bgTextY,
          x: '-50%',
          translateY: '-58%',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <span
          className="hero-bg-text"
          style={{
            fontFamily: "'Bebas Neue', 'Barlow Condensed', 'Oswald', sans-serif",
            fontSize: 'clamp(7rem, 18vw, 22rem)',
            fontWeight: 900,
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #FF2A00 0%, #FF5500 30%, #FF7A00 50%, rgba(255,80,0,0.25) 78%, rgba(255,50,0,0.04) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            display: 'block',
            textAlign: 'center',
            whiteSpace: 'nowrap',
          }}
        >
          PORTFOLIO
        </span>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 2 — Floating Tech Tags (Desktop)
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-tags"
        style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}
      >
        {TECH_TAGS.map(tag => (
          <FloatingTag key={tag.label} tag={tag} reduced={reduced} />
        ))}
      </div>

      {/* ── Tablet tags (horizontal row above portrait) ── */}
      <div
        className="hero-tablet-tags"
        style={{
          position: 'absolute',
          top: '12%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'none',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.5rem',
          zIndex: 3,
          maxWidth: '70%',
          pointerEvents: 'none',
        }}
      >
        {TECH_TAGS.map(tag => (
          <span
            key={tag.label}
            style={{
              padding: '0.28rem 0.7rem',
              borderRadius: '999px',
              background: `${tag.color}14`,
              border: `1px solid ${tag.color}40`,
              color: tag.color,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
            }}
          >
            <span style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: tag.color, display: 'inline-block', flexShrink: 0,
            }} />
            {tag.label.replace('\n', ' ')}
          </span>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 3 — Professional Portrait (Right Side)
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        ref={portraitRef}
        className="hero-portrait-wrap"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 'clamp(0%, 3vw, 6%)',
          y: portraitY,
          zIndex: 4,
          width: 'clamp(280px, 34vw, 500px)',
          pointerEvents: 'none',
        }}
      >
        {/* Orange rim glow — left edge */}
        <div style={{
          position: 'absolute', left: '-30px', top: '5%',
          width: '90px', height: '80%',
          background: 'radial-gradient(ellipse at right, rgba(255,80,0,0.5) 0%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'rimGlow 4s ease-in-out infinite',
          zIndex: 1,
        }} />

        {/* Red rim glow — right edge */}
        <div style={{
          position: 'absolute', right: '-30px', top: '5%',
          width: '90px', height: '80%',
          background: 'radial-gradient(ellipse at left, rgba(230,48,32,0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
          animation: 'rimGlow 4s ease-in-out infinite 1.2s',
          zIndex: 1,
        }} />

        {/* Bottom ground glow */}
        <div style={{
          position: 'absolute', bottom: '-20px', left: '5%', right: '5%',
          height: '120px',
          background: 'radial-gradient(ellipse at center, rgba(255,70,0,0.45) 0%, rgba(255,40,0,0.1) 50%, transparent 75%)',
          filter: 'blur(25px)',
          zIndex: 1,
        }} />

        {/* Orbital glow ring — outer */}
        <div className="orbital-ring" style={{
          width: '110%', height: '110%',
          top: '-5%', left: '-5%',
        }} />

        {/* Orbital glow ring — inner (counter-rotate) */}
        <div className="orbital-ring" style={{
          width: '90%', height: '90%',
          top: '5%', left: '5%',
          animationDirection: 'reverse',
          animationDuration: '6s',
          borderColor: 'rgba(230, 48, 32, 0.12)',
        }} />

        {/* Portrait image — mix-blend-mode: multiply removes white bg on dark page */}
        <motion.img
          src={portrait}
          alt="Divakaran A P — AI & Machine Learning Engineer"
          initial={{ opacity: 0, scale: 0.92, y: 60 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            position: 'relative',
            zIndex: 2,
            filter: 'contrast(1.08) saturate(1.15) brightness(0.95)',
          }}
        />

        {/* Bottom cinematic fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 50%, #000000 100%)',
          zIndex: 3,
          pointerEvents: 'none',
        }} />
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 4 — Left Introduction Panel
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-left-panel"
        style={{
          position: 'absolute',
          left: 'clamp(1.5rem, 4.5vw, 5.5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.6rem',
          maxWidth: 'clamp(240px, 26vw, 380px)',
        }}
      >
        {/* ── HELLO, I'M ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.6rem, 1.1vw, 0.78rem)',
            fontWeight: 600,
            color: '#FF6500',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ width: '26px', height: '2px', background: '#FF6500', display: 'inline-block' }} />
          HELLO, I'M
        </motion.div>

        {/* ── Name ── */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <div
            className="hero-name-text"
            style={{
              fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
              fontSize: 'clamp(3.2rem, 5.8vw, 6.5rem)',
              fontWeight: 400,
              lineHeight: 0.92,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
              textShadow: '0 2px 24px rgba(0,0,0,0.8)',
            }}
          >
            DIVAKARAN
          </div>
          <div
            className="hero-name-ap"
            style={{
              fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
              fontSize: 'clamp(2.6rem, 4.8vw, 5.5rem)',
              fontWeight: 400,
              lineHeight: 0.9,
              background: 'linear-gradient(90deg, #FF4500, #FF8C00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.02em',
            }}
          >
            A P.
          </div>
        </motion.div>

        {/* ── Role subtitle ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginTop: '0.4rem' }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.58rem, 1vw, 0.72rem)',
              fontWeight: 700,
              color: '#FF6500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 1.8,
              borderLeft: '2px solid rgba(255,101,0,0.4)',
              paddingLeft: '0.7rem',
            }}
          >
            AI & MACHINE LEARNING<br />
            ENGINEER / BUILDER.
          </div>
        </motion.div>

        {/* ── Bio ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.68rem, 1vw, 0.82rem)',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            margin: '0.6rem 0 1rem',
            maxWidth: '340px',
          }}
        >
          I build intelligent systems, experiment with emerging technologies, and transform ambitious ideas into real-world solutions.
        </motion.p>

        {/* ── CTA Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', width: '100%', maxWidth: '260px' }}
        >
          {/* VIEW MY WORK */}
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); scrollTo('projects'); }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.72rem 1.5rem',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #FF4500, #FF8C00)',
              color: '#000',
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(255,80,0,0.45)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 36px rgba(255,80,0,0.65)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(255,80,0,0.45)';
            }}
          >
            VIEW MY WORK <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>

          {/* DOWNLOAD RESUME */}
          <a
            href="/assets/resume/Divakaran_AP_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.68rem 1.5rem',
              borderRadius: '4px',
              background: 'transparent',
              border: '1px solid rgba(255,80,0,0.55)',
              color: 'rgba(255,255,255,0.85)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.7rem, 1vw, 0.8rem)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              cursor: 'pointer',
              backdropFilter: 'blur(6px)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = '#FF6500';
              el.style.color = '#FF6500';
              el.style.boxShadow = '0 0 20px rgba(255,80,0,0.3)';
              el.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = 'rgba(255,80,0,0.55)';
              el.style.color = 'rgba(255,255,255,0.85)';
              el.style.boxShadow = 'none';
              el.style.transform = 'translateY(0)';
            }}
          >
            <Download size={14} />
            DOWNLOAD RESUME
          </a>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 5 — Right Statistics Panel
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-right-stats"
        style={{
          position: 'absolute',
          right: 'clamp(1.5rem, 4vw, 5rem)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          alignItems: 'flex-end',
        }}
      >
        {STATS.map((block, i) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.14 }}
            style={{ textAlign: 'right' }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
                fontSize: 'clamp(1.6rem, 2.8vw, 2.8rem)',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1,
                textShadow: '0 0 24px rgba(255,100,0,0.35)',
              }}
            >
              {block.value}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(0.52rem, 0.8vw, 0.65rem)',
                color: 'rgba(255,255,255,0.38)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                marginTop: '0.2rem',
              }}
            >
              {block.label}
            </div>
          </motion.div>
        ))}

        {/* Open to Internships */}
        <motion.div
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.92 }}
          style={{
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(0.52rem, 0.8vw, 0.65rem)',
              color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              lineHeight: 1.5,
            }}>
              OPEN TO<br />INTERNSHIPS
            </div>
          </div>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#FF6500',
            boxShadow: '0 0 14px rgba(255,100,0,0.9)',
            display: 'inline-block',
            flexShrink: 0,
          }} />
        </motion.div>

        {/* Vertical accent line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            position: 'absolute',
            right: '-22px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(180deg, transparent, #FF6500, transparent)',
            transformOrigin: 'top',
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 6 — Bottom Bar
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.div
        className="hero-bottom-bar"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.1rem clamp(1.5rem, 4vw, 4.5rem)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {/* Left: Identity */}
        <div
          className="hero-bottom-left"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.9rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.35)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#FF6500', display: 'inline-block',
              boxShadow: '0 0 8px rgba(255,100,0,0.6)',
            }} />
            DIVAKARAN / AI & ML ENGINEER
          </span>
          <span style={{ opacity: 0.3, fontSize: '0.7rem' }}>│</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={10} strokeWidth={2} />
            CHENNAI, INDIA
          </span>
        </div>

        {/* Center: Scroll cue */}
        <div
          onClick={() => scrollTo('about')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.58rem',
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.3)',
            cursor: 'pointer',
            textTransform: 'uppercase',
            padding: '0.45rem 1.2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '999px',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,101,0,0.3)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          }}
        >
          SCROLL TO EXPLORE
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={12} color="rgba(255,101,0,0.6)" />
          </motion.div>
        </div>

        {/* Right: Social icons */}
        <div
          className="hero-bottom-right"
          style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}
        >
          {SOCIALS.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.4)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                background: 'rgba(255,255,255,0.02)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,101,0,0.5)';
                el.style.color = '#FF6500';
                el.style.boxShadow = '0 0 16px rgba(255,101,0,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.color = 'rgba(255,255,255,0.4)';
                el.style.boxShadow = 'none';
              }}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE — Stats row
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-mobile-stats-row"
        style={{
          display: 'none',
          justifyContent: 'center',
          gap: '1.8rem',
          padding: '1.2rem 1rem 0.5rem',
          zIndex: 6,
        }}
      >
        {STATS.map(block => (
          <div key={block.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.6rem',
              color: '#FF6500',
              lineHeight: 1,
            }}>
              {block.value}
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.48rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.12em',
              marginTop: '0.2rem',
            }}>
              {block.label}
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: '#FF6500', display: 'inline-block',
              boxShadow: '0 0 8px rgba(255,100,0,0.8)',
            }} />
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.48rem',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.12em',
            marginTop: '0.3rem',
          }}>
            OPEN TO<br />INTERNSHIPS
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOBILE — Tech tags row
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        className="hero-mobile-tags-row"
        style={{
          display: 'none',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0.45rem',
          padding: '0.5rem 1rem 4rem',
          zIndex: 6,
        }}
      >
        {TECH_TAGS.slice(0, 6).map(tag => (
          <span
            key={tag.label}
            style={{
              padding: '0.22rem 0.6rem',
              borderRadius: '999px',
              background: `${tag.color}14`,
              border: `1px solid ${tag.color}40`,
              color: tag.color,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.6rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {tag.label.replace('\n', ' ')}
          </span>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          LAYER 7 — Bottom gradient fade (smooth hero→about transition)
      ═══════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '300px',
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 25%, rgba(0,0,0,0.7) 55%, #000000 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
};

export default HeroSection;
