import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GitBranch, Link2, Code2, Mail, ArrowUp, Sparkles, Terminal } from 'lucide-react'
import { personalInfo } from '../../data/portfolio'

export const Footer: React.FC = () => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const socialLinks = [
    {
      name: 'GitHub',
      url: personalInfo.github,
      icon: GitBranch,
      accent: '#00D4FF',
      description: 'Source code & models',
    },
    {
      name: 'LinkedIn',
      url: personalInfo.linkedin,
      icon: Link2,
      accent: '#0A66C2',
      description: 'Professional network',
    },
    {
      name: 'LeetCode',
      url: personalInfo.leetcode,
      icon: Code2,
      accent: '#FFA116',
      description: 'Algorithms & logic',
    },
    {
      name: 'Email',
      url: `mailto:${personalInfo.email}`,
      icon: Mail,
      accent: '#8B5CF6',
      description: 'Get in touch directly',
    },
  ]

  const quickLinks = [
    { label: 'S01 ABOUT', href: '#about' },
    { label: 'S02 JOURNEY', href: '#skills' },
    { label: 'S03 ORIGINALS', href: '#projects' },
    { label: 'S04 EXPERIENCE', href: '#experience' },
    { label: 'S05 ACHIEVEMENTS', href: '#achievements' },
    { label: 'S07 CONTACT', href: '#contact' },
  ]

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        marginTop: '6rem',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic top border with glowing line */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.4) 30%, rgba(139, 92, 246, 0.5) 70%, transparent 100%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '20%',
            right: '20%',
            height: '5px',
            background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.6), rgba(139, 92, 246, 0.6), transparent)',
            filter: 'blur(4px)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Main Footer Container */}
      <div
        style={{
          maxWidth: 'var(--container-max)',
          margin: '0 auto',
          padding: '4.5rem 2rem 2.5rem',
        }}
      >
        {/* Top Tier: Branding, Navigation & Socials */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px',
                background: 'linear-gradient(135deg, #FF6B00, #E63020)',
                borderRadius: '6px',
                boxShadow: '0 0 20px rgba(255,107,0,0.4)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-headline)',
                  fontWeight: 900, fontSize: '1rem',
                  color: '#fff', letterSpacing: '0.08em',
                }}>D</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{
                  fontFamily: 'var(--font-headline)', fontWeight: 800,
                  fontSize: '0.85rem', letterSpacing: '0.08em', color: '#fff',
                }}>DIVAKARAN</span>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.48rem',
                  letterSpacing: '0.12em', color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                }}>AI & ML ENGINEER</span>
              </div>
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
                maxWidth: '380px',
              }}
            >
              An interactive streaming-style portfolio chronicling intelligent AI agents, machine learning research, and cloud-scale systems engineering.
            </p>

            {/* Production Credits Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--glass-border)',
                width: 'fit-content',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-green)',
                  boxShadow: '0 0 8px var(--color-green)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.06em',
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                }}
              >
                Original Series • S01-S07 Ready
              </span>
            </div>
          </div>

          {/* Quick Seasons Nav */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Sparkles size={14} color="var(--color-blue)" />
              Episode Guide
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.75rem 1rem',
              }}
            >
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'all var(--transition-fast)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-orange)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-secondary)'
                    e.currentTarget.style.transform = 'translateX(0)'
                  }}
                >
                  <span style={{ color: 'var(--color-orange)', fontSize: '0.65rem' }}>▸</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect / Socials */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Terminal size={14} color="var(--color-blue)" />
              Connect & Transmit
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                const isHovered = hoveredSocial === social.name

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(social.name)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.9rem',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isHovered ? social.accent : 'var(--glass-border)'}`,
                      textDecoration: 'none',
                      color: 'var(--color-text-primary)',
                      transition: 'all 0.25s ease',
                      boxShadow: isHovered ? `0 0 20px ${social.accent}33` : 'none',
                      transform: isHovered ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          backgroundColor: isHovered ? `${social.accent}22` : 'rgba(255, 255, 255, 0.05)',
                          color: isHovered ? social.accent : 'var(--color-text-secondary)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <IconComponent size={16} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {social.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.65rem',
                            color: 'var(--color-text-muted)',
                          }}
                        >
                          {social.description}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: isHovered ? social.accent : 'var(--color-text-muted)',
                        transform: isHovered ? 'translateX(2px)' : 'none',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      ↗
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Tech Stack and Scroll To Top */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          {/* Copyright info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.05em',
              }}
            >
              © {new Date().getFullYear()} {personalInfo.name}. ALL RIGHTS RESERVED.
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--color-text-muted)',
              }}
            >
              BUILT WITH REACT 19 • THREE.JS • FRAMER MOTION • CHENNAI, INDIA
            </div>
          </div>

          {/* Back to top cinematic button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 1.1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-blue)'
              e.currentTarget.style.backgroundColor = 'rgba(0, 212, 255, 0.08)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)'
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label="Scroll back to top of page"
          >
            <span>TOP OF STREAM</span>
            <ArrowUp size={14} color="var(--color-blue)" />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
