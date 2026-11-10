import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import portrait from '../../assets/portrait-pro.png';

interface Props {
  onComplete: () => void;
}

const STATUS_TEXTS = [
  'INITIALIZING EXPERIENCE',
  'LOADING AI MODULES',
  'CONSTRUCTING DIGITAL WORLD',
  'PREPARING PORTFOLIO',
  'WELCOME TO MY WORLD',
];

/* ────────────────────────────────────────────────────────────────────────────
   Canvas Particle System — orange/red particles with depth
   ──────────────────────────────────────────────────────────────────────── */
function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 20 : 50;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface P {
      x: number; y: number; vx: number; vy: number;
      r: number; a: number; speed: number;
      targetX: number; targetY: number;
    }

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const particles: P[] = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 150 + Math.random() * 300;
      return {
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 2.5 + 0.5,
        a: Math.random() * 0.6 + 0.15,
        speed: 0.3 + Math.random() * 0.5,
        targetX: cx + (Math.random() - 0.5) * 60,
        targetY: cy + (Math.random() - 0.5) * 60,
      };
    });

    let phase = 0; // 0 = scattered, 1 = converging
    const setPhase = (p: number) => { phase = p; };
    (window as any).__preloaderSetPhase = setPhase;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        if (phase === 1) {
          // Converge toward center
          p.x += (p.targetX - p.x) * 0.02;
          p.y += (p.targetY - p.y) * 0.02;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          // Gentle orbit around center
          const dx = p.x - cx;
          const dy = p.y - cy;
          const angle = Math.atan2(dy, dx) + 0.003;
          const dist = Math.sqrt(dx * dx + dy * dy);
          p.x = cx + Math.cos(angle) * dist;
          p.y = cy + Math.sin(angle) * dist;
        }

        // Wrap
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${60 + Math.floor(Math.random() * 50)}, 0, ${p.a})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 80, 0, ${p.a * 0.1})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      delete (window as any).__preloaderSetPhase;
    };
  }, [canvasRef]);
}

/* ────────────────────────────────────────────────────────────────────────────
   CinematicPreloader — 3D Identity Reveal
   ──────────────────────────────────────────────────────────────────────── */
const CinematicPreloader: React.FC<Props> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  useParticles(canvasRef);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Converge particles
    if ((window as any).__preloaderSetPhase) {
      (window as any).__preloaderSetPhase(1);
    }

    // Cinematic zoom-through transition
    const tl = gsap.timeline();
    tl.to(containerRef.current, {
      scale: 1.3,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.inOut',
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    // SAFETY: auto-dismiss after 7 seconds
    const safetyTimer = setTimeout(finish, 7000);

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // ── Phase 1: Portal glow appears (0–0.8s) ──
    if (portalRef.current) {
      tl.fromTo(
        portalRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        0.2
      );
    }

    // ── Phase 2: Name builds letter by letter (0.5–1.8s) ──
    if (nameRef.current) {
      const chars = nameRef.current.querySelectorAll('.p-char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 40, rotateX: -90, scale: 0.5 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 0.12, stagger: 0.06, ease: 'back.out(2)',
        },
        0.5
      );
    }

    // ── Phase 2b: Subtitle ──
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.6
      );
    }

    // ── Phase 3: Portrait emerges from portal (1.2–2.5s) ──
    if (portraitRef.current) {
      tl.fromTo(
        portraitRef.current,
        { opacity: 0, scale: 0.6, y: 30, rotateY: -15 },
        {
          opacity: 1, scale: 1, y: 0, rotateY: 0,
          duration: 1.2, ease: 'power2.out',
        },
        1.2
      );
    }

    // ── Phase 4: PORTFOLIO 3D text (2–3s) ──
    if (portfolioRef.current) {
      tl.fromTo(
        portfolioRef.current,
        { opacity: 0, rotateX: -45, scale: 0.8, y: 30 },
        { opacity: 0.12, rotateX: 0, scale: 1, y: 0, duration: 1, ease: 'power2.out' },
        2
      );
    }

    // ── Phase 5: Progress (0–5s) ──
    const progressDuration = 4800;
    const startTime = Date.now();
    const circumference = 2 * Math.PI * 36;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / progressDuration) * 100));
      setProgress(pct);
      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = String(
          circumference - (pct / 100) * circumference
        );
      }
      if (pct < 100) requestAnimationFrame(updateProgress);
    };
    requestAnimationFrame(updateProgress);

    // ── Phase 6: Status text changes ──
    if (statusRef.current) {
      tl.set(statusRef.current, { textContent: STATUS_TEXTS[0] }, 0);
      tl.set(statusRef.current, { textContent: STATUS_TEXTS[1] }, 1.2);
      tl.set(statusRef.current, { textContent: STATUS_TEXTS[2] }, 2.4);
      tl.set(statusRef.current, { textContent: STATUS_TEXTS[3] }, 3.6);
      tl.set(statusRef.current, { textContent: STATUS_TEXTS[4] }, 4.5);
    }

    // ── Phase 7: Portal pulses ──
    if (portalRef.current) {
      gsap.to(portalRef.current, {
        boxShadow: '0 0 80px rgba(255,80,0,0.6), 0 0 160px rgba(255,80,0,0.3), inset 0 0 60px rgba(255,80,0,0.15)',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }

    // ── Phase 8: Completion (5.2s) ──
    tl.call(finish, [], 5.2);

    return () => {
      clearTimeout(safetyTimer);
      tl.kill();
    };
  }, [finish]);

  const circumference = 2 * Math.PI * 36;
  const nameChars = 'DIVAKARAN A P'.split('');

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transformOrigin: 'center center',
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Ambient orange radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(255,80,0,0.1) 0%, rgba(255,40,0,0.03) 40%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Giant PORTFOLIO text (background) */}
      <div
        ref={portfolioRef}
        style={{
          position: 'absolute',
          fontFamily: "'Bebas Neue', 'Barlow Condensed', sans-serif",
          fontSize: 'clamp(4rem, 16vw, 14rem)',
          fontWeight: 400,
          letterSpacing: '0.08em',
          background: 'linear-gradient(180deg, rgba(255,101,0,0.2) 0%, rgba(230,48,32,0.06) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0,
        }}
      >
        PORTFOLIO
      </div>

      {/* ═══ Glowing Portal Ring ═══ */}
      <div
        ref={portalRef}
        style={{
          position: 'absolute',
          width: 'clamp(180px, 28vw, 280px)',
          height: 'clamp(180px, 28vw, 280px)',
          borderRadius: '50%',
          border: '2px solid rgba(255,107,0,0.4)',
          boxShadow: '0 0 50px rgba(255,80,0,0.4), 0 0 100px rgba(255,80,0,0.15), inset 0 0 40px rgba(255,80,0,0.1)',
          zIndex: 2,
          opacity: 0,
          transform: 'scale(0)',
        }}
      >
        {/* Rotating ring accent */}
        <div style={{
          position: 'absolute', inset: '-8px',
          borderRadius: '50%',
          border: '1px solid rgba(255,107,0,0.15)',
          animation: 'orbit-spin 6s linear infinite',
        }}>
          <div style={{
            position: 'absolute', top: '-3px', left: '50%', transform: 'translateX(-50%)',
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#FF6B00', boxShadow: '0 0 12px #FF6B00',
          }} />
        </div>

        {/* Second rotating ring */}
        <div style={{
          position: 'absolute', inset: '-20px',
          borderRadius: '50%',
          border: '1px solid rgba(255,107,0,0.08)',
          animation: 'orbit-spin 10s linear infinite reverse',
        }}>
          <div style={{
            position: 'absolute', top: '-2px', left: '50%', transform: 'translateX(-50%)',
            width: '4px', height: '4px', borderRadius: '50%',
            background: '#E63020', boxShadow: '0 0 8px #E63020',
          }} />
        </div>
      </div>

      {/* ═══ Portrait emerging from portal ═══ */}
      <div
        ref={portraitRef}
        style={{
          position: 'absolute',
          width: 'clamp(140px, 22vw, 220px)',
          zIndex: 3,
          opacity: 0,
          perspective: '800px',
        }}
      >
        <img
          src={portrait}
          alt="Divakaran A P"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            mixBlendMode: 'multiply',
            filter: 'contrast(1.1) saturate(1.2) brightness(0.9)',
            borderRadius: '50%',
          }}
        />
        {/* Holographic scan overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'linear-gradient(180deg, transparent 40%, rgba(255,107,0,0.08) 60%, transparent 80%)',
          animation: 'scan-line 2s linear infinite',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ═══ Center content (below portrait) ═══ */}
      <div style={{
        position: 'relative', zIndex: 4, textAlign: 'center',
        marginTop: 'clamp(180px, 20vw, 260px)',
      }}>
        {/* Name — metallic 3D typography */}
        <div
          ref={nameRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.06em',
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '0.14em',
            marginBottom: '0.5rem',
            perspective: '800px',
          }}
        >
          {nameChars.map((ch, i) => (
            <span
              key={i}
              className="p-char"
              style={{
                display: 'inline-block',
                opacity: 0,
                minWidth: ch === ' ' ? '0.25em' : undefined,
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FF8C40 60%, #CC4A00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 8px rgba(255,107,0,0.3))',
                transformStyle: 'preserve-3d',
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.48rem, 1.1vw, 0.65rem)',
            letterSpacing: '0.35em',
            color: 'rgba(255,107,0,0.5)',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            opacity: 0,
          }}
        >
          AI & MACHINE LEARNING ENGINEER
        </div>

        {/* Circular progress */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <div style={{ position: 'relative', width: '76px', height: '76px' }}>
            <svg width="76" height="76" viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" />
              <circle
                ref={circleRef}
                cx="40" cy="40" r="36" fill="none"
                stroke="url(#pGrad)" strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
                style={{ transition: 'stroke-dashoffset 0.1s linear' }}
              />
              <defs>
                <linearGradient id="pGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF6B00" />
                  <stop offset="100%" stopColor="#E63020" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1rem', color: '#FFFFFF',
              letterSpacing: '0.05em',
            }}>
              {progress}%
            </div>
          </div>
        </div>

        {/* Status text */}
        <div
          ref={statusRef}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.45rem, 0.9vw, 0.58rem)',
            letterSpacing: '0.28em',
            color: 'rgba(255,255,255,0.25)',
            textTransform: 'uppercase',
            minHeight: '1.2em',
          }}
        >
          {STATUS_TEXTS[0]}
        </div>
      </div>

      {/* Decorative corner accents */}
      <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 1 }}>
        <div style={{ width: '30px', height: '1px', background: 'rgba(255,107,0,0.2)' }} />
        <div style={{ width: '1px', height: '30px', background: 'rgba(255,107,0,0.2)' }} />
      </div>
      <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 1 }}>
        <div style={{ width: '30px', height: '1px', background: 'rgba(255,107,0,0.2)', marginLeft: 'auto' }} />
        <div style={{ width: '1px', height: '30px', background: 'rgba(255,107,0,0.2)', marginLeft: 'auto' }} />
      </div>

      {/* Bottom accent dots */}
      <div style={{
        position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '4px', zIndex: 1,
      }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            style={{
              width: '3px', height: '3px', borderRadius: '50%',
              background: '#FF6B00',
            }}
          />
        ))}
      </div>

      {/* Inline keyframes for orbit-spin (in case CSS not loaded yet) */}
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan-line {
          0% { background-position: 0% 0%; }
          100% { background-position: 0% 200%; }
        }
      `}</style>
    </motion.div>
  );
};

export default CinematicPreloader;
