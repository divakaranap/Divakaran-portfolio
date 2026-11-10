import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Code2, Compass, ArrowRight, Check, Sparkles, Tv } from 'lucide-react';
import type { ProfileType } from '../../data/portfolio';
import { profileConfigs } from '../../data/portfolio';

export interface ProfileSelectorProps {
  onSelect: (profile: ProfileType) => void;
}

interface ProfileMeta {
  type: ProfileType;
  icon: React.ComponentType<{ size?: number; color?: string; style?: React.CSSProperties }>;
  glowColor: string;
  gradient: string;
  tagline: string;
}

const PROFILES: ProfileMeta[] = [
  {
    type: 'recruiter',
    icon: Briefcase,
    glowColor: '#00D4FF',
    gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.25) 0%, rgba(0, 102, 255, 0.08) 100%)',
    tagline: 'Career & Credentials',
  },
  {
    type: 'developer',
    icon: Code2,
    glowColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.08) 100%)',
    tagline: 'Code & Architecture',
  },
  {
    type: 'explorer',
    icon: Compass,
    glowColor: '#06B6D4',
    gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(16, 185, 129, 0.08) 100%)',
    tagline: 'All Innovations',
  },
];

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({ onSelect }) => {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [hoveredProfile, setHoveredProfile] = useState<ProfileType | null>(null);
  const [tiltMap, setTiltMap] = useState<Record<ProfileType, { rotateX: number; rotateY: number }>>({
    recruiter: { rotateX: 0, rotateY: 0 },
    developer: { rotateX: 0, rotateY: 0 },
    explorer: { rotateX: 0, rotateY: 0 },
  });

  const cardRefs = useRef<Record<ProfileType, HTMLDivElement | null>>({
    recruiter: null,
    developer: null,
    explorer: null,
  });

  const handleMouseMove = useCallback((type: ProfileType, e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRefs.current[type];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xRatio = (x / rect.width) - 0.5; // -0.5 to 0.5
    const yRatio = (y / rect.height) - 0.5; // -0.5 to 0.5

    setTiltMap((prev) => ({
      ...prev,
      [type]: {
        rotateX: -yRatio * 18, // max 9 deg tilt
        rotateY: xRatio * 18,
      },
    }));
  }, []);

  const handleMouseLeave = useCallback((type: ProfileType) => {
    setHoveredProfile(null);
    setTiltMap((prev) => ({
      ...prev,
      [type]: { rotateX: 0, rotateY: 0 },
    }));
  }, []);

  const handleSelectProfile = useCallback((profile: ProfileType) => {
    if (selectedProfile) return; // Prevent multiple clicks
    setSelectedProfile(profile);

    // Smooth exit delay to show selection animation
    setTimeout(() => {
      onSelect(profile);
    }, 600);
  }, [selectedProfile, onSelect]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        backgroundColor: '#0a0a0f',
        backgroundImage: `
          radial-gradient(ellipse at 50% 15%, rgba(0, 212, 255, 0.08) 0%, transparent 60%),
          radial-gradient(ellipse at 85% 85%, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse at 15% 85%, rgba(6, 182, 212, 0.06) 0%, transparent 60%)
        `,
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2.5rem 1.5rem',
        userSelect: 'none',
      }}
    >
      {/* Top Series Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
        }}
      >
        <Tv size={18} color="#00D4FF" />
        <span
          style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: '0.9rem',
            fontWeight: 800,
            letterSpacing: '0.22em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
          }}
        >
          DIVAKARAN <span style={{ color: '#00D4FF' }}>—</span> THE SERIES
        </span>
      </motion.div>

      {/* Main Profile Selection Section */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%',
          margin: 'auto 0',
          padding: '2rem 0',
        }}
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display, sans-serif)',
            fontSize: 'clamp(2.4rem, 6vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            margin: '0 0 0.85rem 0',
            textTransform: 'uppercase',
            textShadow: '0 0 30px rgba(0, 0, 0, 0.8)',
          }}
        >
          WHO'S WATCHING?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(255, 255, 255, 0.65)',
            maxWidth: '600px',
            margin: '0 0 3.5rem 0',
            lineHeight: 1.5,
          }}
        >
          Select your viewing profile for a personalized experience
        </motion.p>

        {/* Profile Cards Container (Horizontal Grid/Flex) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'stretch',
            gap: '2.5rem',
            width: '100%',
            maxWidth: '1080px',
          }}
        >
          {PROFILES.map((profile, index) => {
            const config = profileConfigs[profile.type];
            const isHovered = hoveredProfile === profile.type;
            const isSelected = selectedProfile === profile.type;
            const isAnySelected = selectedProfile !== null;
            const tilt = tiltMap[profile.type];
            const Icon = profile.icon;

            return (
              <motion.div
                key={profile.type}
                ref={(el) => {
                  cardRefs.current[profile.type] = el;
                }}
                initial={{ opacity: 0, y: 35 }}
                animate={
                  isAnySelected
                    ? isSelected
                      ? { opacity: 1, scale: 1.06, y: 0 }
                      : { opacity: 0.18, scale: 0.94, filter: 'blur(3px)' }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                transition={{
                  duration: 0.5,
                  delay: isAnySelected ? 0 : 0.35 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  perspective: '1000px',
                  width: 'clamp(270px, 28vw, 320px)',
                  display: 'flex',
                }}
              >
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`Select profile: ${config.label}`}
                  onClick={() => handleSelectProfile(profile.type)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProfile(profile.type);
                    }
                  }}
                  onMouseEnter={() => setHoveredProfile(profile.type)}
                  onMouseMove={(e) => handleMouseMove(profile.type, e)}
                  onMouseLeave={() => handleMouseLeave(profile.type)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    backgroundColor: 'rgba(18, 18, 28, 0.7)',
                    border: `1px solid ${isHovered || isSelected ? profile.glowColor : 'rgba(255, 255, 255, 0.08)'}`,
                    borderRadius: 'var(--radius-lg, 20px)',
                    padding: '2.25rem 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: isAnySelected ? 'default' : 'pointer',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    transformStyle: 'preserve-3d',
                    transform: `
                      rotateX(${tilt.rotateX}deg) 
                      rotateY(${tilt.rotateY}deg) 
                      scale(${isHovered && !isAnySelected ? 1.05 : 1})
                      translateY(${isHovered && !isAnySelected ? '-8px' : '0px'})
                    `,
                    boxShadow: isSelected
                      ? `0 0 50px ${profile.glowColor}, 0 20px 40px rgba(0, 0, 0, 0.9)`
                      : isHovered
                      ? `0 0 40px ${profile.glowColor}55, 0 16px 36px rgba(0, 0, 0, 0.8)`
                      : '0 8px 32px rgba(0, 0, 0, 0.5)',
                    transition: isHovered
                      ? 'transform 0.12s ease-out, border-color 0.25s ease, box-shadow 0.25s ease'
                      : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease',
                    outline: 'none',
                  }}
                >
                  {/* Subtle Accent Glow Ring Inside Card */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '180px',
                      height: '180px',
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${profile.glowColor}30 0%, transparent 70%)`,
                      filter: 'blur(25px)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* 3D-Style Icon / Avatar Container */}
                  <div
                    style={{
                      position: 'relative',
                      width: '120px',
                      height: '120px',
                      borderRadius: '26px',
                      background: profile.gradient,
                      border: `2px solid ${isHovered || isSelected ? profile.glowColor : 'rgba(255, 255, 255, 0.12)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.75rem',
                      transform: 'translateZ(30px)',
                      boxShadow: isHovered || isSelected
                        ? `0 0 30px ${profile.glowColor}80, inset 0 0 20px ${profile.glowColor}40`
                        : '0 8px 24px rgba(0, 0, 0, 0.4)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {/* Rotating decorative halo on hover */}
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-6px',
                        borderRadius: '30px',
                        border: `1px dashed ${profile.glowColor}`,
                        opacity: isHovered || isSelected ? 0.7 : 0,
                        transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                        pointerEvents: 'none',
                      }}
                    />

                    {/* Main Avatar Icon */}
                    <Icon
                      size={48}
                      color={isHovered || isSelected ? '#FFFFFF' : profile.glowColor}
                      style={{
                        filter: isHovered || isSelected ? `drop-shadow(0 0 12px ${profile.glowColor})` : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />

                    {/* Selected Checkmark Badge */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          right: '-8px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: profile.glowColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: `0 0 15px ${profile.glowColor}`,
                        }}
                      >
                        <Check size={16} color="#060a12" strokeWidth={3} />
                      </motion.div>
                    )}
                  </div>

                  {/* Profile Name */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-display, sans-serif)',
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      color: isHovered || isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
                      margin: '0 0 0.4rem 0',
                      textTransform: 'uppercase',
                      transform: 'translateZ(20px)',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {config.label}
                  </h2>

                  {/* Tagline */}
                  <div
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.15em',
                      color: profile.glowColor,
                      textTransform: 'uppercase',
                      marginBottom: '1rem',
                      transform: 'translateZ(15px)',
                    }}
                  >
                    {profile.tagline}
                  </div>

                  {/* Description Text */}
                  <p
                    style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.85rem',
                      color: 'rgba(255, 255, 255, 0.55)',
                      lineHeight: 1.55,
                      margin: '0 0 1.5rem 0',
                      minHeight: '2.8em',
                      transform: 'translateZ(10px)',
                    }}
                  >
                    {config.description}
                  </p>

                  {/* Hover 'SELECT' Button / Label */}
                  <div
                    style={{
                      marginTop: 'auto',
                      width: '100%',
                      transform: 'translateZ(25px)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.7rem 1.25rem',
                        borderRadius: 'var(--radius-md, 12px)',
                        backgroundColor: isHovered || isSelected ? profile.glowColor : 'rgba(255, 255, 255, 0.05)',
                        color: isHovered || isSelected ? '#060a12' : 'rgba(255, 255, 255, 0.5)',
                        border: `1px solid ${isHovered || isSelected ? profile.glowColor : 'rgba(255, 255, 255, 0.1)'}`,
                        fontFamily: 'var(--font-display, sans-serif)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        transition: 'all 0.25s ease',
                        boxShadow: isHovered || isSelected ? `0 0 20px ${profile.glowColor}80` : 'none',
                      }}
                    >
                      <span>{isSelected ? 'SELECTED' : isHovered ? 'SELECT PROFILE' : 'EXPLORE'}</span>
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Access / Guest mode link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            marginTop: '3.5rem',
          }}
        >
          <button
            type="button"
            onClick={() => handleSelectProfile('explorer')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '0.65rem 1.6rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
              e.currentTarget.style.color = '#00D4FF';
              e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Sparkles size={13} color="#00D4FF" />
            <span>QUICK BROWSE AS GUEST</span>
          </button>
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.72rem',
          color: 'rgba(255, 255, 255, 0.3)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}
      >
        SELECT A PROFILE TO REORDER AND HIGHLIGHT CUSTOM SECTIONS
      </footer>
    </motion.div>
  );
};

export default ProfileSelector;
